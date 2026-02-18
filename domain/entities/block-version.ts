export interface BlockVersion {
  id: number;
  createdAt: Date;
  content: Record<string, unknown>;
  blockId: number;
}

export interface CreateBlockVersionDTO {
  content: Record<string, unknown>;
  blockId: number;
}
