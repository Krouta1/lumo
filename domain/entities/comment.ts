export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  pageId: number;
  blockId?: number | null;
  authorId: string;
}

export interface CreateCommentDTO {
  content: string;
  pageId: number;
  blockId?: number;
  authorId: string;
}

export interface UpdateCommentDTO {
  id: number;
  content?: string;
}
