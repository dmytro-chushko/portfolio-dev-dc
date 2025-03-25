import type { Meta, StoryObj } from '@storybook/react';

import Paragraph from './Paragraph';

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  argTypes: {
    accent: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accent: true,
    className: '',
    children:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
};
