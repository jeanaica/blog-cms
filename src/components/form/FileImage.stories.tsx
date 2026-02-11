import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, createElement, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import FileImage from './FileImage';

const FormWrapper = ({
  error,
  ...props
}: ComponentProps<typeof FileImage> & { error?: string }) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: null },
  });

  useEffect(() => {
    if (error) {
      methods.setError(props.name, { message: error });
    }
  }, [error, methods, props.name]);

  return createElement(FormProvider, {
    ...methods,
    children: createElement(
      'form',
      { className: 'max-w-md' },
      createElement(FileImage, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/FileImage',
  component: FormWrapper,
  args: {
    label: 'Image',
    name: 'image',
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Upload a cover image' },
};

export const WithError: Story = {
  args: { error: 'Image is required' },
};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
