import type {
  Block,
  CreateBlockDTO,
  UpdateBlockDTO,
} from "@/domain/entities/block";
import { Repository } from "@/domain/repositories/repository";

export interface BlockRepository extends Repository<
  Block,
  CreateBlockDTO,
  UpdateBlockDTO
> {
  findByPageId(pageId: number): Promise<Block[]>;
  softDelete(id: number): Promise<void>;
}
