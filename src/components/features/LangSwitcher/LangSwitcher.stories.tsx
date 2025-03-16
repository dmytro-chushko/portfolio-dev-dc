import type { Meta, StoryObj } from '@storybook/react';

import LangSwitcher from './LangSwitcher';

const meta = {
  title: 'Features/Lang Switcher',
  component: LangSwitcher,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    currentLang: { control: 'select' },
  },
} satisfies Meta<typeof LangSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EN: Story = {
  args: {
    currentLang: 'en',
    langs: ['en', 'ua'],
  },
};

export const UA: Story = {
  args: {
    currentLang: 'ua',
    langs: ['en', 'ua'],
  },
};
