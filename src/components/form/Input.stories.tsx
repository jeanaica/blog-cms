import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, createElement, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import Input from './Input';

const FormWrapper = ({
  error,
  defaultValue,
  ...props
}: ComponentProps<typeof Input> & { error?: string }) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: defaultValue ?? '' },
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
      createElement(Input, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/Input',
  component: FormWrapper,
  args: {
    label: 'Username',
    name: 'username',
    placeholder: 'Enter username',
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Must be at least 3 characters' },
};

export const WithError: Story = {
  args: { error: 'This field is required' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'john_doe' },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Cannot edit' },
};

export const Password: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Number: Story = {
  args: { label: 'Age', name: 'age', type: 'number', placeholder: '0' },
};
