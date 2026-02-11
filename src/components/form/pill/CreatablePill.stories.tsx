import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, createElement, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import CreatablePill from './CreatablePill';

const categoryOptions = [
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'LIFESTYLE', label: 'Lifestyle' },
];

const FormWrapper = ({
  error,
  defaultValue,
  ...props
}: ComponentProps<typeof CreatablePill> & {
  error?: string;
  defaultValue?: Array<{ value: string; label: string }>;
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: defaultValue ?? [] },
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
      createElement(CreatablePill, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/CreatablePill',
  component: FormWrapper,
  args: {
    label: 'Categories',
    name: 'categories',
    options: categoryOptions,
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Select or create categories' },
};

export const WithSelectedValues: Story = {
  args: {
    defaultValue: [
      { value: 'TECHNOLOGY', label: 'Technology' },
      { value: 'DESIGN', label: 'Design' },
    ],
  },
};

export const WithError: Story = {
  args: { error: 'At least one category is required' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: [{ value: 'TECHNOLOGY', label: 'Technology' }],
  },
};

export const WithRemovable: Story = {
  args: {
    hasRemovable: true,
    defaultValue: [
      { value: 'TECHNOLOGY', label: 'Technology' },
      { value: 'DESIGN', label: 'Design' },
    ],
  },
};
