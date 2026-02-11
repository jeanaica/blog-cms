import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import FileImage from './FileImage';

const FormWrapper = ({
  error,
  ...props
}: React.ComponentProps<typeof FileImage> & { error?: string }) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: null },
  });

  React.useEffect(() => {
    if (error) {
      methods.setError(props.name, { message: error });
    }
  }, [error]);

  return React.createElement(FormProvider, {
    ...methods,
    children: React.createElement(
      'form',
      { className: 'max-w-md' },
      React.createElement(FileImage, props)
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
