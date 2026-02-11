import { FC, useEffect, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import Container from 'components/container/Container';
import Alert from 'components/alert/Alert';
import ContentBlocksEditor from 'components/contentBlock/ContentBlocksEditor';
import LoadingModal from 'components/form/LoadingModal';
import UnsavedChangesModal from 'components/form/UnsavedChangesModal';

import TitleMenu from './TitleMenu';
import FormAccordion from './FormAccordion';
import { ArticleInput } from '../types/ArticleInput';
import { ContentBlock } from 'components/contentBlock/types';

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
  const [previewUrl, setPreviewUrl] = useState('');

  const {
    watch,
    setValue,
    formState: { isDirty, isSubmitted },
  } = methods;

  const title: string = watch('title');
  const contentBlocks: ContentBlock[] = watch('contentBlocks') || [];
  const slug: string = watch('slug');
  const status: string | undefined = watch('status');

  const onPreview = () => {
    if (slug && contentBlocks.length) {
      const html = blocksToPreviewHtml(contentBlocks);
      localStorage.setItem(`preview-${slug}`, html);
    }
  };

  useEffect(() => {
    const regExChars = /[^a-zA-Z0-9 -]/g;
    const trimmedTitle = title && title.trim();
    const slug =
      trimmedTitle &&
      trimmedTitle.toLowerCase().replace(regExChars, '').replaceAll(' ', '-');

    setValue('slug', slug);
  }, [title, setValue]);

  useEffect(() => {
    const id = slug;
    setPreviewUrl(`/article/${id}/preview`);
  }, [slug, setPreviewUrl]);

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
        <LoadingModal isOpen={submitting || (submitting && isSubmitted)} />
        <UnsavedChangesModal hasUnsavedChanges={isDirty} />
      </FormProvider>
    </Container>
  );
};

export default MainForm;
