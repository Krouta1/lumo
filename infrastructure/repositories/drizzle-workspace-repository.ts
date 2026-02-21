import { eq } from "drizzle-orm";
import { db } from "@/utils/drizzle";
import { workspaces } from "@/drizzle/schema";
import type { WorkspaceRepository } from "@/domain/repositories/workspace-repository";
import type {
  Workspace,
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO,
} from "@/domain/entities/workspace";

export class DrizzleWorkspaceRepository implements WorkspaceRepository {
  async findById(id: number): Promise<Workspace | null> {
    const result = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return this.mapToEntity(result[0]);
  }

  async findByOwnerId(ownerId: string): Promise<Workspace[]> {
    const result = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.ownerId, ownerId));

    return result.map((row: typeof workspaces.$inferSelect) =>
      this.mapToEntity(row),
    );
  }

  async create(input: CreateWorkspaceDTO): Promise<Workspace> {
    const result = await db
      .insert(workspaces)
      .values({
        name: input.name,
        ownerId: input.ownerId,
      })
      .returning();

    return this.mapToEntity(result[0] ?? []);
  }

  async update(input: UpdateWorkspaceDTO): Promise<Workspace> {
    const result = await db
      .update(workspaces)
      .set({
        name: input.name,
      })
      .where(eq(workspaces.id, input.id))
      .returning();

    return this.mapToEntity(result[0] ?? []);
  }

  async delete(id: number): Promise<void> {
    await db.delete(workspaces).where(eq(workspaces.id, id));
  }

  private mapToEntity(row: typeof workspaces.$inferSelect): Workspace {
    return {
      id: row.id,
      createdAt: new Date(row.createdAt),
      name: row.name,
      ownerId: row.ownerId,
    };
  }
}
