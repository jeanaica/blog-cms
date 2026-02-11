import type { Meta, StoryObj } from '@storybook/react-vite';
import HelperText from './HelperText';

const meta = {
  title: 'Components/Form/HelperText',
  component: HelperText,
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'Must be at least 8 characters' },
};

export const NoText: Story = {
  args: { text: undefined },
};

export const WithCustomClass: Story = {
  args: { text: 'Custom styled helper', className: 'text-base font-medium' },
};
