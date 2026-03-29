import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button.tsx";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Send message",
    variant: "primary",
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    label: "Cancel",
    variant: "ghost",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Unavailable",
    variant: "primary",
    disabled: true,
  },
};

export const GhostDisabled: Story = {
  args: {
    label: "Unavailable",
    variant: "ghost",
    disabled: true,
  },
};