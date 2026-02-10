export type BlockType = 'text' | 'gallery' | 'image';

export type ContentBlock = {
  type: BlockType;
  content?: string;
  images?: Array<{ url: string; caption: string; alt: string }>;
  image?: File | string;
  caption?: string;
  alt?: string;
};

export const BLOCK_TYPE_META: Record<
  BlockType,
  { label: string; icon: string }
> = {
  text: { label: 'Text', icon: 'article' },
  gallery: { label: 'Gallery', icon: 'photo_library' },
  image: { label: 'Image', icon: 'image' },
};
