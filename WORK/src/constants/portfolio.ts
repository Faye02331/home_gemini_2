export interface Project {
  id: number;
  title: string;
  category: string;
}

export const PROJECTS: Project[] = [
  { id: 1, title: "UIUX Design", category: "MOBILE DESIGN" },
  { id: 2, title: "Game Design", category: "ENTERTAINMENT DESIGN" },
  { id: 3, title: "Graphic Design", category: "ILLUSTRATION" },
  { id: 4, title: "Motion Design", category: "MOTION GRAPHIC" },
];

export const NAV_LINKS = [
  { label: "DESIGN", href: "#" },
  { label: "FOLIO", href: "#" },
  { label: "CONTACT", href: "#" },
];
