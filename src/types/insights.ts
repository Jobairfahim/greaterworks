import { ImageData } from "./homepage";

export interface BlogPageData {
  id: number;
  documentId: string;
  pageTitle: string;
  pageDescription: string;
  secondTitle: string;
  secondDiscription: string;
  lastTitle: string;
  lastDiscription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  serviceTagline?: string;
}

export interface Blog {
  excerpt: string;
  id: number;
  documentId: string;
  title: string;
  publishingDate: string;
  readTime: string;
  authorName: string;
  authorEmail: string;
  /** Rich-text HTML string from Strapi */
  description: string;
  slug: string;
  coverImage?: ImageData | null;
  facebookLink: string | null;
  twitterLink: string | null;
  pinterestLink: string | null;
  linkedinLink: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isFeatured: boolean;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
  } | null;
}
