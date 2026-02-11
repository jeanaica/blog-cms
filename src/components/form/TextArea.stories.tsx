import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, createElement, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import TextArea from './TextArea';

const FormWrapper = ({
  error,
  ...props
}: ComponentProps<typeof TextArea> & { error?: string }) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: '' },
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
      createElement(TextArea, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/TextArea',
  component: FormWrapper,
  args: {
    label: 'Description',
    name: 'description',
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Write a brief description' },
};

export const WithError: Story = {
  args: { error: 'Description is required' },
};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CustomRows: Story = {
  args: { rows: 10, helperText: '10 rows tall' },
};
