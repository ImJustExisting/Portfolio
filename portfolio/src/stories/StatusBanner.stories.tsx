import type { Meta, StoryObj } from "@storybook/react";
import StatusBanner from "./StatusBanner";

const meta: Meta<typeof StatusBanner> = {
  title: "UI/StatusBanner",
  component: StatusBanner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusBanner>;

export const Success: Story = {
  args: {
    type: "success",
    message: "Your message was sent successfully.",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Something went wrong. Please try again.",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    message: "Please fill in all required fields.",
  },
};