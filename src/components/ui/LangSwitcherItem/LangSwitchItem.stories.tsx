import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import LangSwitchItem from './LangSwitchItem';

const meta = {
  title: 'UI/Lang Switch Item',
  component: LangSwitchItem,
  parameters: {
    layout: 'centered',
  },
  args: { onSelect: fn() },
} satisfies Meta<typeof LangSwitchItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: 'en',
    isCurrent: false,
  },
};

export const Active: Story = {
  args: {
    lang: 'en',
    isCurrent: true,
  },
};
