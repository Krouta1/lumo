export interface Workspace {
  id: number;
  createdAt: Date;
  name: string;
  ownerId: string;
}

export interface CreateWorkspaceDTO {
  name: string;
  ownerId: string;
}

export interface UpdateWorkspaceDTO {
  id: number;
  name?: string;
}
