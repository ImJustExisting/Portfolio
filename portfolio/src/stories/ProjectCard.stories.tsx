import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const meta: Meta<typeof ProjectCard> = {
  title: "UI/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const WebProject: Story = {
  args: {
    id: "budget-buddy",
    title: "Budget Buddy",
    shortDescription: "Personal finance tracker with charts and categories.",
    previewImage: "https://placehold.co/600x400",
    category: "Web",
    tags: ["React", "Redux Toolkit", "Vite"],
  },
};

export const DesignProject: Story = {
  args: {
    id: "profileCard",
    title: "Profile Card",
    shortDescription: "A small interactive and animated card component.",
    previewImage: "https://placehold.co/600x400",
    category: "Design",
    tags: ["Next.js", "Tailwind CSS"],
  },
};

export const NoImage: Story = {
  args: {
    id: "no-image",
    title: "Project Without Image",
    shortDescription: "This project has no preview image.",
    category: "Mobile",
    tags: ["React Native"],
  },
};