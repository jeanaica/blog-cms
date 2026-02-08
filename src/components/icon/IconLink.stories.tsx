import type { Meta, StoryObj } from '@storybook/react-vite';
import IconLink from './IconLink';

const meta = {
  title: 'Components/IconLink',
  component: IconLink,
  args: {
    icon: 'open_in_new',
    href: '/example',
  },
} satisfies Meta<typeof IconLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTooltip: Story = {
  args: { icon: 'visibility', href: '/preview', tooltip: 'Preview' },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
