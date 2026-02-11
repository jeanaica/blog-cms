import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import GalleryBlock from './GalleryBlock';

const FormWrapper = ({
  galleryName,
  images,
}: {
  galleryName?: string;
  images?: Array<{ id: string; url: string; caption?: string; alt?: string }>;
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      contentBlocks: [
        { type: 'gallery' as const, galleryName, images: images ?? [] },
      ],
    },
  });

  return React.createElement(FormProvider, {
    ...methods,
    children: React.createElement(
      'form',
      null,
      React.createElement(
        'div',
        { className: 'rounded border border-gray-200 overflow-hidden' },
        React.createElement(GalleryBlock, { index: 0 })
      )
    ),
  });
};

const meta = {
  title: 'Components/ContentBlock/GalleryBlock',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => React.createElement(FormWrapper),
};

export const WithImages: Story = {
  render: () =>
    React.createElement(FormWrapper, {
      galleryName: 'Vacation Photos',
      images: [
        {
          id: '1',
          url: 'https://placehold.co/400x400/e2e8f0/64748b?text=Image+1',
          caption: 'Beach sunset',
          alt: 'Golden sunset over the ocean',
        },
        {
          id: '2',
          url: 'https://placehold.co/400x400/fecaca/991b1b?text=Image+2',
          caption: 'Mountain trail',
          alt: 'Hiking trail through the mountains',
        },
        {
          id: '3',
          url: 'https://placehold.co/400x400/bbf7d0/166534?text=Image+3',
          caption: 'City skyline',
          alt: 'Skyline at dusk',
        },
      ],
    }),
};
