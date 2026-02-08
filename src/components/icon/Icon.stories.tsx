import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    icon: 'home',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { icon: 'settings', size: 'sm' },
};

export const Base: Story = {
  args: { icon: 'settings', size: 'base' },
};

export const Large: Story = {
  args: { icon: 'settings', size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { icon: 'settings', size: 'xl' },
};

export const XXLarge: Story = {
  args: { icon: 'settings', size: '2xl' },
};

export const CustomSize: Story = {
  args: { icon: 'settings', size: 48 },
};
