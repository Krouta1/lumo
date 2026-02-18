export interface PageSession {
  id: number;
  createdAt: Date;
  lastSeen: Date;
  pageId: number;
  userId: string;
}

export interface CreatePageSessionDTO {
  pageId: number;
  userId: string;
}

export interface UpdatePageSessionDTO {
  id: number;
  lastSeen: Date;
}
