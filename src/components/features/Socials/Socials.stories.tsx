import type { Meta, StoryObj } from '@storybook/react';

import Socials from './Socials';

const meta = {
  title: 'Features/Socials',
  component: Socials,
} satisfies Meta<typeof Socials>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
