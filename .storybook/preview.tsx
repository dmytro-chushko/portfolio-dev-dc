import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import { themes } from '@storybook/theming';
import React, { ElementType } from 'react';

export const decorators = [
  (Story: ElementType, { viewMode }) => {
    const modes = {
      docs: '135px',
      story: '100vh',
    };

    return (
      <div
        style={{ padding: '20px', height: modes[viewMode] }}
        className="p-5 w-full h-[135px] bg-background flex justify-center items-center "
      >
        <Story />
      </div>
    );
  },
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      values: [
        { name: 'light', value: '#eff6ff' },
        { name: 'dark', value: '#172554' },
      ],
    },
    docs: {
      theme: themes.dark,
    },
  },
  tags: ['autodocs'],
};

export default preview;
