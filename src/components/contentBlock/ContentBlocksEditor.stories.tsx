import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import ContentBlocksEditor from './ContentBlocksEditor';
import { type ContentBlock } from './types';

const FormWrapper = ({
  defaultValues,
}: {
  defaultValues?: ContentBlock[];
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: { contentBlocks: defaultValues ?? [] },
  });

  return React.createElement(FormProvider, {
    ...methods,
    children: React.createElement(
      'form',
      null,
      React.createElement(ContentBlocksEditor)
    ),
  });
};

const meta = {
  title: 'Components/ContentBlocksEditor',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => React.createElement(FormWrapper),
};

export const WithBlocks: Story = {
  render: () =>
    React.createElement(FormWrapper, {
      defaultValues: [
        { type: 'text', content: '<p>First text block with content.</p>' },
        { type: 'gallery', galleryName: 'My Gallery', images: [{ id: '1', url: 'https://placehold.co/400x400/e2e8f0/64748b?text=Gallery+1', caption: 'First photo', alt: 'Placeholder 1' }, { id: '2', url: 'https://placehold.co/400x400/fecaca/991b1b?text=Gallery+2', caption: 'Second photo', alt: 'Placeholder 2' }] },
        { type: 'image', image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Sample+Image', caption: 'A sample image', alt: 'Placeholder image' },
        { type: 'text', content: '<h2>Second Block</h2><p>More <strong>rich text</strong> here.</p>' },
      ],
    }),
};

export const SingleBlock: Story = {
  render: () =>
    React.createElement(FormWrapper, {
      defaultValues: [{ type: 'text', content: '' }],
    }),
};
