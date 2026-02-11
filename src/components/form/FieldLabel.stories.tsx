import type { Meta, StoryObj } from '@storybook/react-vite';
import FieldLabel from './FieldLabel';

const meta = {
  title: 'Components/Form/FieldLabel',
  component: FieldLabel,
  args: {
    children: 'Email Address',
  },
} satisfies Meta<typeof FieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHtmlFor: Story = {
  args: { children: 'Username', htmlFor: 'username' },
};

export const WithCustomClass: Story = {
  args: { children: 'Custom Label', className: 'text-lg mb-2' },
};
