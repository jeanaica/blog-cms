import type { Meta, StoryObj } from '@storybook/react-vite';
import Loading from './Loading';

const meta = {
  title: 'Components/Loading',
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  args: { text: 'Loading data' },
};

export const PageType: Story = {
  args: { text: 'Loading page', type: 'page' },
};

export const LargeSize: Story = {
  args: { text: 'Please wait', size: 'lg' },
};
