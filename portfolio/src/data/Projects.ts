import BBImg from "../assets/BudgetBuddy.png";
import AOTFImg from "../assets/AOTF.png";
import PCImg from "../assets/Card.png";
export type ProjectCategory = "Web" | "Mobile" | "Design";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  shortDescription: string;
  longDescription: string;
  image?: string;        
  liveUrl: string; 
  previewImage?: string;      
};

export const projects: Project[] = [
  {
    id: "budget-buddy",
    title: "Budget Buddy",
    category: "Web",
    tags: ["React", "Redux Toolkit", "Vite"],
    shortDescription: "Personal finance tracker with charts and categories.",
    longDescription: "Budget Buddy is a mobile-first budgeting application designed to help university students manage their stipend and apprenticeship income effectively. The app provides tools for tracking income, categorizing expenses, setting savings goals, and visualizing financial health. Made as a part of my final year project at MCAST in collaboration with classmates.",
    liveUrl: "https://budget-buddy-project-deploy.vercel.app/",
    previewImage: BBImg
  },
  {
    id: "acensionOfTheForgotten",
    title: "Acension of The Forgotten",
    category: "Web",
    tags: ["React", "CSS"],
    shortDescription: "Promotional website for the potential game Acension of The Forgotten.",
    longDescription: "A promotional website with all the information regarding the conceptual Acension of The Forgotten.",
    liveUrl: "https://ascension-project-vercel-deploy.vercel.app/",
    previewImage: AOTFImg
  },
  {
    id: "profileCard",
    title: "Profile Card",
    category: "Design",
    tags: ["Next.js", "Tailwind CSS"],
    shortDescription: "A small interactive and animated card component.",
    longDescription: "This card component was built using Next.js and Tailwind CSS. It features interactive elements and smooth animations to enhance user engagement. The design is responsive, ensuring it looks great on all devices. Contains information on me.",
    liveUrl: "https://cardrepo.vercel.app/",
    previewImage: PCImg
  },
];
