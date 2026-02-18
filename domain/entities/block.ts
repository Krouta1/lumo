export interface Block {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  content: Record<string, unknown>;
  position: string;
  pageId: number;
  deletedAt?: Date | null;
}

export interface CreateBlockDTO {
  type: string;
  content: Record<string, unknown>;
  position: string;
  pageId: number;
}

export interface UpdateBlockDTO {
  id: number;
  type?: string;
  content?: Record<string, unknown>;
  position?: string;
}
