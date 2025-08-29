export interface ProjectNode {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'service' | 'api' | 'ai' | 'database' | 'config';
  description?: string;
  technologies?: string[];
  children?: ProjectNode[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  credentials: Credential[];
  apiDocs?: string;
  githubUrl?: string;
  tree?: ProjectNode[];
}

export interface Credential {
  id: string;
  role: string;
  username: string;
  password: string;
  api_key?: string;
  description: string;
}

export interface ProjectData {
  thomaggio: Project;
  firecloud: Project;
  chatbot: Project;
}