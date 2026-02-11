import { ContentBlock } from 'components/contentBlock/types';
import uploadImage from 'lib/api/uploadImage';
import uploadImages from 'lib/api/uploadImages';

export type ContentBlockMutationInput = {
  type: string;
  order: number;
  content?: string;
  url?: string;
  alt?: string;
  caption?: string;
  galleryName?: string;
  images?: Array<{ url: string; alt: string; caption?: string }>;
};

/**
 * Uploads all File objects in content blocks (image blocks and gallery blocks).
 * Returns a new array with Files replaced by their uploaded URLs.
 */
export async function uploadContentBlockImages(
  blocks: ContentBlock[],
  slug: string
): Promise<ContentBlock[]> {
  return Promise.all(
    blocks.map(async block => {
      if (block.type === 'image' && block.image instanceof File) {
        const result = await uploadImage({ file: block.image, folder: `${slug}/images` });
        if (!result.success) {
          throw new Error(result.message);
        }
        return { ...block, image: result.url! };
      }

      if (block.type === 'gallery' && block.images) {
        const filesToUpload: File[] = [];
        const fileIndices: number[] = [];

        block.images.forEach((img, idx) => {
          if (img.file) {
            filesToUpload.push(img.file);
            fileIndices.push(idx);
          }
        });

        if (filesToUpload.length > 0) {
          const galleryName = block.galleryName
            ? block.galleryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            : 'gallery';
          const galleryFolder = `${slug}/galleries/${galleryName}`;
          const result = await uploadImages({ files: filesToUpload, folder: galleryFolder });
          if (!result.success) {
            throw new Error(result.message);
          }

          const updatedImages = [...block.images];
          fileIndices.forEach((imgIdx, i) => {
            updatedImages[imgIdx] = {
              ...updatedImages[imgIdx],
              url: result.urls[i],
              file: undefined,
            };
          });

          return { ...block, images: updatedImages };
        }
      }

      return block;
    })
  );
}

/**
 * Maps frontend ContentBlock[] to the backend ContentBlockInput[] shape.
 * Adds `order` based on array index and maps field names.
 */
export function serializeBlocksForMutation(
  blocks: ContentBlock[]
): ContentBlockMutationInput[] {
  return blocks.map((block, index) => {
    const base = { type: block.type, order: index };

    switch (block.type) {
      case 'text':
        return { ...base, content: block.content || '' };
      case 'image':
        return {
          ...base,
          url: typeof block.image === 'string' ? block.image : '',
          alt: block.alt || '',
          caption: block.caption,
        };
      case 'gallery':
        return {
          ...base,
          galleryName: block.galleryName || '',
          images: (block.images || []).map(img => ({
            url: img.url || '',
            alt: img.alt || '',
            caption: img.caption,
          })),
        };
      default:
        return base;
    }
  });
}

/**
 * Maps backend query response (union type blocks) to frontend ContentBlock[] shape.
 * If no contentBlocks but legacy content exists, wraps it in a single text block.
 */
export function mapContentBlocksFromQuery(
  blocks: any[] | null | undefined,
  legacyContent?: string
): ContentBlock[] {
  if (blocks && blocks.length > 0) {
    return [...blocks]
      .sort((a, b) => a.order - b.order)
      .map(block => {
        switch (block.type) {
          case 'text':
            return { type: 'text' as const, content: block.content };
          case 'image':
            return {
              type: 'image' as const,
              image: block.url,
              alt: block.alt,
              caption: block.caption,
            };
          case 'gallery':
            return {
              type: 'gallery' as const,
              galleryName: block.galleryName,
              images: (block.images || []).map(
                (img: { url: string; alt: string; caption?: string }) => ({
                  id: crypto.randomUUID(),
                  url: img.url,
                  alt: img.alt,
                  caption: img.caption,
                })
              ),
            };
          default:
            return { type: block.type };
        }
      });
  }

  // Auto-wrap legacy content as a single text block
  if (legacyContent && legacyContent.trim()) {
    return [{ type: 'text' as const, content: legacyContent }];
  }

  return [];
}
