import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import FieldErrorIcon from './FieldErrorIcon';

const meta = {
  title: 'Components/Form/FieldErrorIcon',
  component: FieldErrorIcon,
  decorators: [
    Story =>
      React.createElement(
        'div',
        { className: 'relative h-10 w-64 border border-gray-300 rounded' },
        React.createElement(Story)
      ),
  ],
} satisfies Meta<typeof FieldErrorIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
