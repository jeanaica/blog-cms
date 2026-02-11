import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import Input from './Input';

const FormWrapper = ({
  error,
  defaultValue,
  ...props
}: React.ComponentProps<typeof Input> & { error?: string }) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: defaultValue ?? '' },
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
      React.createElement(Input, props)
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
  args: { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter password' },
};

export const Number: Story = {
  args: { label: 'Age', name: 'age', type: 'number', placeholder: '0' },
};
