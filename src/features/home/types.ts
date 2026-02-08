export interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  timeZone: string;
  email: string;
  github: string;
  discord?: string;
  skills: string[];
  experience: string;
  profileImage: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  images: string[];
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  keyFeatures: string[];
}

export interface ContactItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionType: "link" | "modal";
  actionValue: string;
  buttonText: string;
}
