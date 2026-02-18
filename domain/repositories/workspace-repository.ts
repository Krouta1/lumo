import type {
  Workspace,
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO,
} from "@/domain/entities/workspace";
import { Repository } from "@/domain/repositories/repository";

export interface WorkspaceRepository extends Repository<
  Workspace,
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO
> {
  findByOwnerId(ownerId: string): Promise<Workspace[]>;
}
