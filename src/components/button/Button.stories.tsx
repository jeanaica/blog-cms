import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'Click me' },
};

export const Primary: Story = {
  args: { text: 'Primary', primary: true },
};

export const WithIcon: Story = {
  args: { text: 'Save', icon: 'save' },
};

export const Loading: Story = {
  args: { text: 'Saving...', isLoading: true },
};

export const Disabled: Story = {
  args: { text: 'Disabled', disabled: true },
};

export const WithChildren: Story = {
  args: { children: 'Custom content' },
};
