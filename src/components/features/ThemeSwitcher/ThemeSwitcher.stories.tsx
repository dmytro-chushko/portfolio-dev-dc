import type { Meta, StoryObj } from '@storybook/react';

import ThemeSwitcher from './ThemeSwitcher';

const meta = {
  title: 'Features/Theme Switcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    themes: {
      light: 'light',
      dark: 'dark',
      system: 'system',
    },
  },
};
