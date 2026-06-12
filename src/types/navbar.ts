import { ImageData } from "./homepage";

export interface NavbarService {
  id: number;
  serviceDescription: string | null;
  serviceIcon: ImageData | null;
  service: {
    id: number;
    documentId: string;
    serviceTitle: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  } | null;
}

export interface NavbarIndustry {
  id: number;
  industryTitle: string | null;
  industryIcon: ImageData | null;
}

export interface NavbarApproach {
  id: number;
  approachTitle: string | null;
  approachDescription: string | null;
  approachIcon: ImageData | null;
}

export interface NavbarSolution {
  id: number;
  solutoinTitle: string | null; // Note: spelt as solutoinTitle in Strapi API
  solutionIcon: ImageData | null;
  sidbar: NavbarSolutionSidebar[];
}

export interface NavbarSolutionSidebar {
  id: number;
  solutionSidbarTitle: string;
  solutionSdibarDescription: string; // Note: spelt as solutionSdibarDescription in Strapi API
}

export interface NavbarData {
  id: number;
  documentId: string;
  serviceSidbarDescription: string;
  solutionSidbarDescription: string;
  serviceSidbarTitle: string;
  serviceSidbarContactEmail: string;
  contactLink: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  solutionSidbar: NavbarSolutionSidebar[];
  solutionCategories?: Array<{
  label: string;
  icon?: ImageData | null;
  items: Array<{ title: string; desc: string }>;
}>;
  ServiceSidbarImage: ImageData | null;
  navbarIcom: ImageData | null; // Note: spelt as navbarIcom in Strapi API
  footerIcon: ImageData | null;
  services: NavbarService[];
  industries: NavbarIndustry[];
  approach: NavbarApproach[];
  solution: NavbarSolution[];
}
