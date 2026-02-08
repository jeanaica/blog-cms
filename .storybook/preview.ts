import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => {
      // Ensure portal root exists for Modal
      if (!document.getElementById('react-portal-modal-container')) {
        const div = document.createElement('div');
        div.id = 'react-portal-modal-container';
        document.body.appendChild(div);
      }

      return React.createElement(
        MemoryRouter,
        null,
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
