import type {
  Comment,
  CreateCommentDTO,
  UpdateCommentDTO,
} from "@/domain/entities/comment";
import { Repository } from "@/domain/repositories/repository";

export interface CommentRepository extends Repository<
  Comment,
  CreateCommentDTO,
  UpdateCommentDTO
> {
  findByPageId(pageId: number): Promise<Comment[]>;
  findByBlockId(blockId: number): Promise<Comment[]>;
}
