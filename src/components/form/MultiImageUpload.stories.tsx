import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import MultiImageUpload, { type ImageItem } from './MultiImageUpload';

const FormWrapper = ({
  defaultImages,
  maxImages,
  showMetadata,
}: {
  defaultImages?: ImageItem[];
  maxImages?: number;
  showMetadata?: boolean;
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: { images: defaultImages ?? [] },
  });

  return React.createElement(FormProvider, {
    ...methods,
    children: React.createElement(
      'form',
      null,
      React.createElement(
        'div',
        { className: 'max-w-2xl' },
        React.createElement(MultiImageUpload, {
          name: 'images',
          maxImages,
          showMetadata,
        })
      )
    ),
  });
};

const meta = {
  title: 'Components/Form/MultiImageUpload',
  component: FormWrapper,
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithImages: Story = {
  args: {
    defaultImages: [
      {
        id: '1',
        url: 'https://placehold.co/400x400/e2e8f0/64748b?text=Image+1',
      },
      {
        id: '2',
        url: 'https://placehold.co/400x400/fecaca/991b1b?text=Image+2',
      },
      {
        id: '3',
        url: 'https://placehold.co/400x400/bbf7d0/166534?text=Image+3',
      },
      {
        id: '4',
        url: 'https://placehold.co/400x400/bfdbfe/1e40af?text=Image+4',
      },
    ],
  },
};

export const WithMetadata: Story = {
  args: {
    showMetadata: true,
    defaultImages: [
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
        caption: '',
        alt: '',
      },
    ],
  },
};

export const WithMaxImages: Story = {
  args: {
    maxImages: 3,
    defaultImages: [
      {
        id: '1',
        url: 'https://placehold.co/400x400/e2e8f0/64748b?text=Image+1',
      },
      {
        id: '2',
        url: 'https://placehold.co/400x400/fecaca/991b1b?text=Image+2',
      },
      {
        id: '3',
        url: 'https://placehold.co/400x400/bbf7d0/166534?text=Image+3',
      },
    ],
  },
};
