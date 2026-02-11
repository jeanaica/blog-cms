import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import Pill from './Pill';

const tagOptions = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'tailwind', label: 'Tailwind CSS' },
];

const FormWrapper = ({
  error,
  defaultValue,
  ...props
}: React.ComponentProps<typeof Pill> & {
  error?: string;
  defaultValue?: Array<{ value: string; label: string }>;
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: defaultValue ?? [] },
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
      React.createElement(Pill, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/Pill',
  component: FormWrapper,
  args: {
    label: 'Tags',
    name: 'tags',
    options: tagOptions,
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Select one or more tags' },
};

export const WithSelectedValues: Story = {
  args: {
    defaultValue: [
      { value: 'react', label: 'React' },
      { value: 'typescript', label: 'TypeScript' },
    ],
  },
};

export const WithError: Story = {
  args: { error: 'At least one tag is required' },
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
    defaultValue: [{ value: 'react', label: 'React' }],
  },
};

export const WithRemovable: Story = {
  args: {
    hasRemovable: true,
    defaultValue: [
      { value: 'react', label: 'React' },
      { value: 'nextjs', label: 'Next.js' },
    ],
  },
};
