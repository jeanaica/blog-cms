import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Accordion from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleItem: Story = {
  args: {
    items: [
      {
        title: 'What is this project?',
        content: React.createElement('p', null, 'A blog CMS built with React and Firebase.'),
      },
    ],
  },
};

export const MultipleItems: Story = {
  args: {
    items: [
      {
        title: 'Getting Started',
        content: React.createElement('p', null, 'Clone the repo and run npm install.'),
      },
      {
        title: 'Configuration',
        content: React.createElement('p', null, 'Set up your Firebase credentials in the .env file.'),
      },
      {
        title: 'Deployment',
        content: React.createElement('p', null, 'Run npm run build and deploy to your hosting provider.'),
      },
    ],
  },
};
