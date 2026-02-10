import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import SingleImageBlock from './SingleImageBlock';

const FormWrapper = ({
  image,
  caption,
  alt,
}: {
  image?: string;
  caption?: string;
  alt?: string;
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      contentBlocks: [{ type: 'image', image, caption, alt }],
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
        React.createElement(SingleImageBlock, { index: 0 })
      )
    ),
  });
};

const meta = {
  title: 'Components/ContentBlock/SingleImageBlock',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => React.createElement(FormWrapper),
};

export const WithImage: Story = {
  render: () =>
    React.createElement(FormWrapper, {
      image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Sample+Image',
      caption: 'A beautiful landscape photo',
      alt: 'Mountain vista with lake in the foreground',
    }),
};
