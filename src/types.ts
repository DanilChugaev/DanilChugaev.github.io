export type ProjectType = 'service' | 'test' | 'game' | 'other';

export interface Project {
  id: number;
  title: string;
  description: string;
  year: number;
  type: ProjectType;
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
}

export type SectionIdType =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'contacts';

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

export interface FilterOption<T = string> {
  value: T;
  label: string;
}
