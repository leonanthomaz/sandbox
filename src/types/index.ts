export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  credentials: Credential[];
  apiDocs?: string;
}

export interface Credential {
  id: string;
  role: string;
  username: string;
  password: string;
  description: string;
}

export interface ProjectData {
  thomaggio: Project;
  firecloud: Project;
}