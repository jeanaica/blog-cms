import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import MultiImageUpload, { type ImageItem } from './MultiImageUpload';

type FormValues = { images: ImageItem[] };

const FormWrapper = ({ defaultImages }: { defaultImages?: ImageItem[] }) => {
  const methods = useForm<FormValues>({
    defaultValues: { images: defaultImages ?? [] },
  });

  return React.createElement(
    FormProvider,
    { ...methods },
    React.createElement(
      'form',
      null,
      React.createElement(
        'div',
        { className: 'max-w-2xl' },
        React.createElement(MultiImageUpload, { name: 'images' })
      )
    )
  );
};

const meta = {
  title: 'Components/Form/MultiImageUpload',
  component: MultiImageUpload,
} satisfies Meta<typeof MultiImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => React.createElement(FormWrapper),
};

export const WithImages: Story = {
  render: () =>
    React.createElement(FormWrapper, {
      defaultImages: [
        { id: '1', url: 'https://placehold.co/400x400/e2e8f0/64748b?text=Image+1' },
        { id: '2', url: 'https://placehold.co/400x400/fecaca/991b1b?text=Image+2' },
        { id: '3', url: 'https://placehold.co/400x400/bbf7d0/166534?text=Image+3' },
        { id: '4', url: 'https://placehold.co/400x400/bfdbfe/1e40af?text=Image+4' },
      ],
    }),
};
