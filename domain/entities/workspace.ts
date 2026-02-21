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

export function createWorkspace(input: {
  id?: number;
  name: string;
  ownerId: string;
  createdAt?: Date;
}): Workspace {
  return {
    id: input.id ?? -1,
    createdAt: input.createdAt ?? new Date(),
    name: input.name,
    ownerId: input.ownerId,
  };
}
