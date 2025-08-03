export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  paperLink?: string;
  bannerImage?: string; // URL or undefined
}
