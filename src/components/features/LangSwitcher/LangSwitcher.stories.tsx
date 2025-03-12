import type { Meta, StoryObj } from '@storybook/react';

import LangSwitcher from './LangSwitcher';

const meta = {
  component: LangSwitcher,
} satisfies Meta<typeof LangSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLang: 'en',
    langs: ['en', 'ua'],
  },
};
