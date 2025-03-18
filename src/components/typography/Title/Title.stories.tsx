import type { Meta, StoryObj } from '@storybook/react';

import Title from './Title';

const meta = {
  title: 'Typography/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
    },
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'h1',
    copy: 'Dmytro Chushko',
    className: '',
  },
};

export const SubTitle: Story = {
  args: {
    header: 'h2',
    copy: 'Dmytro Chushko',
    className: '',
  },
};
