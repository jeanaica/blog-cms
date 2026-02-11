import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, createElement, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import DatePicker from './DatePicker';

const FormWrapper = ({
  error,
  ...props
}: ComponentProps<typeof DatePicker> & { error?: string }) => {
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
      createElement(DatePicker, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/DatePicker',
  component: FormWrapper,
  args: {
    label: 'Publish Date',
    name: 'publishDate',
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Select a publish date' },
};

export const WithError: Story = {
  args: { error: 'Date is required' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: '2025-01-15' },
};

export const WithMinDate: Story = {
  args: { minDate: new Date(), helperText: 'Cannot select a past date' },
};

export const WithDefaultValue: Story = {
  args: { defaultValue: '2025-06-01' },
};
