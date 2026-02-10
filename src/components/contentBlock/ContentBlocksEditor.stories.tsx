import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import ContentBlocksEditor from './ContentBlocksEditor';
import { ContentBlock } from './types';

type FormValues = { contentBlocks: ContentBlock[] };

const FormWrapper = ({
  defaultValues,
}: {
  defaultValues?: ContentBlock[];
}) => {
  const methods = useForm<FormValues>({
    defaultValues: { contentBlocks: defaultValues ?? [] },
  });

  return React.createElement(
    FormProvider,
    { ...methods },
    React.createElement(
      'form',
      null,
      React.createElement(ContentBlocksEditor)
    )
  );
};

const meta = {
  title: 'Components/ContentBlocksEditor',
  component: ContentBlocksEditor,
} satisfies Meta<typeof ContentBlocksEditor>;

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
        { type: 'gallery', images: [] },
        { type: 'image' },
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
