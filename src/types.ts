export interface Project {
  id: number;
  title: string;
  description: string;
  year: number;
  type: 'pet' | 'test';
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
}

export type SectionIdType = 'about' | 'skills' | 'projects' | 'contact';

export interface NavItem {
  sectionId: SectionIdType;
  label: string;
}

export interface Contact {
  label: string;
  href: string;
  value: string;
  icon: string;
  target?: string;
}
