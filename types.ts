
export interface Project {
  image: string;
  title: string;
  description: string;
}

export interface TeamMember {
  photo: string;
  name: string;
  role: string;
  bio: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Event {
  date: string;
  title: string;
  description: string;
  isUpcoming: boolean;
  color?: 'pink' | 'blue';
}