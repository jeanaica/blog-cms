import { type FC, useMemo } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

import Container from 'components/container/Container';
import Alert from 'components/alert/Alert';
import ContentBlocksEditor from 'components/contentBlock/ContentBlocksEditor';
import LoadingModal from 'components/form/LoadingModal';
import UnsavedChangesModal from 'components/form/UnsavedChangesModal';

import TitleMenu from './TitleMenu';
import FormAccordion from './FormAccordion';
import { type ArticleInput } from '../types/ArticleInput';
import { type ContentBlock } from 'components/contentBlock/types';

const SLUG_INVALID_CHARS = /[^a-zA-Z0-9 -]/g;

type Props = {
  methods: UseFormReturn<ArticleInput, any>;
  onSave(): void;
  onSubmit(): void;
  loading?: boolean;
  submitting?: boolean;
  error?: string;
};

function blocksToPreviewHtml(blocks: ContentBlock[]): string {
  return blocks
    .map(block => {
      switch (block.type) {
        case 'text':
          return block.content || '';
        case 'image': {
          const src =
            block.image instanceof File
              ? URL.createObjectURL(block.image)
              : block.image || '';
          const alt = block.alt || '';
          const caption = block.caption
            ? `<figcaption>${block.caption}</figcaption>`
            : '';
          return `<figure><img src="${src}" alt="${alt}" />${caption}</figure>`;
        }
        case 'gallery': {
          const imgs = (block.images || [])
            .map(img => {
              const src =
                img.url || (img.file ? URL.createObjectURL(img.file) : '');
              return `<img src="${src}" alt="${img.alt || ''}" />`;
            })
            .join('');
          return `<div class="gallery">${imgs}</div>`;
        }
        default:
          return '';
      }
    })
    .join('');
}

const MainForm: FC<Props> = ({
  methods,
  onSave,
  onSubmit,
  loading,
  submitting,
  error,
}) => {
  const {
    watch,
    setValue,
    formState: { isDirty },
  } = methods;

  const title: string = watch('title');
  const contentBlocks: ContentBlock[] = watch('contentBlocks') || [];
  const status: string | undefined = watch('status');

  const slug = useMemo(() => {
    const trimmedTitle = title?.trim();
    if (!trimmedTitle) return '';
    return trimmedTitle
      .toLowerCase()
      .replace(SLUG_INVALID_CHARS, '')
      .replaceAll(' ', '-');
  }, [title]);

  if (methods.getValues('slug') !== slug) {
    setValue('slug', slug);
  }

  const onPreview = () => {
    if (slug && contentBlocks.length) {
      const html = blocksToPreviewHtml(contentBlocks);
      localStorage.setItem(`preview-${slug}`, html);
    }
  };

  const previewUrl = `/article/${slug}/preview`;

  return (
    <Container
      className='p-4 pt-0 relative'
      loading={loading}>
      <FormProvider {...methods}>
        <Alert
          type='error'
          message={error}
        />
        <TitleMenu
          status={status}
          previewUrl={previewUrl}
          onPreview={onPreview}
          onSave={onSave}
          onSubmit={onSubmit}
        />
        <FormAccordion />
        <div className='px-1 '>
          <div className='flex items-center w-full py-4'>
            <span className='font-semibold text-gray-500'>Content Blocks</span>
          </div>
          <div className='py-5 p-4 rounded-lg border border-gray-200'>
            <ContentBlocksEditor />
          </div>
        </div>
        <LoadingModal isOpen={submitting} />
        <UnsavedChangesModal hasUnsavedChanges={isDirty} />
      </FormProvider>
    </Container>
  );
};

export default MainForm;
