import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import TextBlock from './TextBlock';

const FormWrapper = ({ content }: { content?: string }) => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      contentBlocks: [{ type: 'text', content: content ?? '' }],
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
        React.createElement(TextBlock, { index: 0 })
      )
    ),
  });
};

const meta = {
  title: 'Components/ContentBlock/TextBlock',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => React.createElement(FormWrapper),
};

export const WithContent: Story = {
  render: () =>
    React.createElement(FormWrapper, {
      content: '<h2>Hello World</h2><p>This is some <strong>rich text</strong> content.</p>',
    }),
};
