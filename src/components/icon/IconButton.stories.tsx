import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: 'edit',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTooltip: Story = {
  args: { icon: 'delete', tooltip: 'Delete item' },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
