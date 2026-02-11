import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    message: 'This is an alert message',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { type: 'info', message: 'This is an informational alert.' },
};

export const Error: Story = {
  args: { type: 'error', message: 'Something went wrong!' },
};

export const Success: Story = {
  args: { type: 'success', message: 'Operation completed successfully.' },
};

export const Warning: Story = {
  args: { type: 'warning', message: 'Please review before proceeding.' },
};

export const Hidden: Story = {
  args: { message: null },
};
