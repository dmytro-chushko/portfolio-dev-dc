import { Meta, StoryObj } from '@storybook/react';

import NavLink from './NavLink';

const meta = {
  title: 'UI/Nav Link',
  component: NavLink,
  tags: ['autodocs'],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Career',
    href: '#',
  },
};
