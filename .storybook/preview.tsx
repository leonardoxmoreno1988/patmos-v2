/// <reference types="vite/client" />
import type { Preview } from '@storybook/tanstack-react';

// Importa tu archivo real de estilos
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#090d16' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Activa el modo oscuro en el html para que Tailwind aplique las variables dark
      document.documentElement.classList.add('dark');
      return Story();
    },
  ],
};

export default preview;