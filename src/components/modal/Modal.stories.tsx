import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    showModal: true,
    children: 'Are you sure you want to delete this item?',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const WithCloseButton: Story = {
  args: {
    onClose: () => {},
    children: 'This modal can be dismissed.',
  },
};

export const Closed: Story = {
  args: { showModal: false },
};
