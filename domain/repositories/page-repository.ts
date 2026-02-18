import type {
  Page,
  CreatePageDTO,
  UpdatePageDTO,
} from "@/domain/entities/page";
import { Repository } from "@/domain/repositories/repository";

export interface PageRepository extends Repository<
  Page,
  CreatePageDTO,
  UpdatePageDTO
> {
  findByWorkspaceId(workspaceId: number): Promise<Page[]>;
  findByParentPageId(parentPageId: string): Promise<Page[]>;
  softDelete(id: number): Promise<void>;
}
