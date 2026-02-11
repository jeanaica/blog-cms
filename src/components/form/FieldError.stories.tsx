import type { Meta, StoryObj } from '@storybook/react-vite';
import FieldError from './FieldError';

const meta = {
  title: 'Components/Form/FieldError',
  component: FieldError,
} satisfies Meta<typeof FieldError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMessage: Story = {
  args: { message: 'This field is required' },
};

export const NoMessage: Story = {
  args: { message: undefined },
};

export const WithCustomClass: Story = {
  args: { message: 'Custom styled error', className: 'text-lg font-bold' },
};
