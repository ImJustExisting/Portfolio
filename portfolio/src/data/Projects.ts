import BBImg from "../assets/BudgetBuddy.png";
import AOTFImg from "../assets/AOTF.png";
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
    shortDescription: "Promotional website for the potential future game Acension of The Forgotten.",
    longDescription: "Full description…",
    liveUrl: "https://ascension-project-vercel-deploy.vercel.app/",
    previewImage: AOTFImg
  },
];
