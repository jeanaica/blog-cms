import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: 'general',
    tabs: [
      { text: 'General', name: 'general', icon: 'settings' },
      { text: 'Content', name: 'content', icon: 'article' },
      { text: 'SEO', name: 'seo', icon: 'search' },
    ],
  },
};

export const WithActiveTab: Story = {
  args: {
    active: 'content',
    tabs: [
      { text: 'General', name: 'general' },
      { text: 'Content', name: 'content' },
      { text: 'SEO', name: 'seo' },
    ],
  },
};

export const WithError: Story = {
  args: {
    active: 'general',
    tabs: [
      { text: 'General', name: 'general' },
      { text: 'Content', name: 'content', hasError: true },
      { text: 'SEO', name: 'seo' },
    ],
  },
};

export const PageTabs: Story = {
  args: {
    isPage: true,
    tabs: [
      { text: 'Posts', href: '/posts', icon: 'article' },
      { text: 'Categories', href: '/categories', icon: 'category' },
    ],
  },
};
