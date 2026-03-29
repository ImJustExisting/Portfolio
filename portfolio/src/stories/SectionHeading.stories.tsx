import type { Meta, StoryObj } from "@storybook/react";
import SectionHeading from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const H1: Story = {
  args: {
    title: "Welcome to Our Studio",
    level: 1,
    align: "left",
  },
};

export const H2WithSubtitle: Story = {
  args: {
    title: "Our Projects",
    subtitle: "A selection of work we are proud of.",
    level: 2,
    align: "left",
  },
};

export const Centered: Story = {
  args: {
    title: "About Us",
    subtitle: "A small team building big ideas.",
    level: 2,
    align: "center",
  },
};

export const H3: Story = {
  args: {
    title: "Skills and Tools",
    level: 3,
    align: "left",
  },
};