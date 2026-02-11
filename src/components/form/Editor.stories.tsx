import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, createElement, useEffect } from 'react';
import { useForm, FormProvider, type FieldValues } from 'react-hook-form';

import Editor from './Editor';

const FormWrapper = ({
  error,
  defaultContent,
  ...props
}: ComponentProps<typeof Editor> & {
  error?: string;
  defaultContent?: string;
}) => {
  const methods = useForm<FieldValues>({
    defaultValues: { [props.name]: defaultContent ?? '' },
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
      { className: 'max-w-2xl' },
      createElement(Editor, props)
    ),
  });
};

const meta = {
  title: 'Components/Form/Editor',
  component: FormWrapper,
  args: {
    label: 'Content',
    name: 'content',
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Write your article content' },
};

export const WithError: Story = {
  args: { error: 'Content is required' },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultContent: '<p>This content is <strong>read-only</strong>.</p>',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithContent: Story = {
  args: {
    defaultContent:
      '<h2>Hello World</h2><p>This is a <strong>rich text</strong> editor with some initial content.</p>',
  },
};
