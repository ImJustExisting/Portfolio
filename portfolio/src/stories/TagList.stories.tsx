import type { Meta, StoryObj } from "@storybook/react";
import TagList from "./TagList";

const meta: Meta<typeof TagList> = {
  title: "UI/TagList",
  component: TagList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const WebTags: Story = {
  args: {
    tags: ["React", "Redux Toolkit", "Vite"],
  },
};

export const DesignTags: Story = {
  args: {
    tags: ["Next.js", "Tailwind CSS"],
  },
};

export const ManyTags: Story = {
  args: {
    tags: ["React", "TypeScript", "CSS", "Vite", "Firebase", "Redux"],
  },
};

export const SingleTag: Story = {
  args: {
    tags: ["React"],
  },
};

export const Empty: Story = {
  args: {
    tags: [],
  },
};