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
  featuredDescription?: string;
}

export type SectionIdType =
  | 'hero'
  | 'about'
  | 'approach'
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
  icon: IconType;
  target?: '_blank';
}

export type IconType =
  | 'email'
  | 'telegram'
  | 'github'
  | 'phone'
  | 'location'
  | 'menu'
  | 'close';

export interface FilterOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}
