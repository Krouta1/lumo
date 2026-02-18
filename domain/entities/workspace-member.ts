export interface WorkspaceMember {
  id: number;
  createdAt: Date;
  role: string;
  userId: string;
  workspaceId: number;
}

export interface CreateWorkspaceMemberDTO {
  role: string;
  userId: string;
  workspaceId: number;
}

export interface UpdateWorkspaceMemberDTO {
  id: number;
  role?: string;
}
