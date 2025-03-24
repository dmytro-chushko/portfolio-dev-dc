import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'select' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    fullwidth: false,
    loading: false,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    fullwidth: false,
    loading: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    fullwidth: false,
    loading: false,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
    fullwidth: false,
  },
};

export const Fullwidth: Story = {
  args: {
    fullwidth: true,
    children: 'Fullwidth Button',
    loading: false,
    variant: 'secondary',
    disabled: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={wrapperStyle}>
        <Story />
      </div>
    ),
  ],
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  padding: '20px',
};
