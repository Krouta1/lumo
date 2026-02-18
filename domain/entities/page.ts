export interface Page {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  icon?: string | null;
  parentPageId?: string | null;
  deletedAt?: Date | null;
  workspaceId: number;
}

export interface CreatePageDTO {
  title: string;
  icon?: string;
  parentPageId?: string;
  workspaceId: number;
}

export interface UpdatePageDTO {
  id: number;
  title?: string;
  icon?: string;
  parentPageId?: string;
}
