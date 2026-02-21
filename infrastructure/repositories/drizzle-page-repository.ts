import { eq } from "drizzle-orm";
import { pages } from "@/drizzle/schema";
import type { PageRepository } from "@/domain/repositories/page-repository";
import type {
  Page,
  CreatePageDTO,
  UpdatePageDTO,
} from "@/domain/entities/page";

export class DrizzlePageRepository implements PageRepository {
  private db: any;

  constructor(dbInstance?: any) {
    this.db = dbInstance ?? require("@/utils/drizzle").db;
  }

  async findById(id: number): Promise<Page | null> {
    const result = await this.db
      .select()
      .from(pages)
      .where(eq(pages.id, id))
      .limit(1);

    if (result.length === 0) return null;

    return this.mapToEntity(result[0]);
  }

  async findByWorkspaceId(workspaceId: number): Promise<Page[]> {
    const result = await this.db
      .select()
      .from(pages)
      .where(eq(pages.workspaceId, workspaceId));

    return result.map((row: typeof pages.$inferSelect) =>
      this.mapToEntity(row),
    );
  }

  async findByParentPageId(parentPageId: string): Promise<Page[]> {
    const result = await this.db
      .select()
      .from(pages)
      .where(eq(pages.parentPageId, parentPageId));

    return result.map((row: typeof pages.$inferSelect) =>
      this.mapToEntity(row),
    );
  }

  async create(input: CreatePageDTO): Promise<Page> {
    const result = await this.db
      .insert(pages)
      .values({
        title: input.title,
        icon: input.icon ?? undefined,
        parentPageId: input.parentPageId ?? undefined,
        workspaceId: input.workspaceId,
      })
      .returning();

    return this.mapToEntity(result[0] ?? []);
  }

  async update(input: UpdatePageDTO): Promise<Page> {
    const setObj: any = {};
    if (input.title !== undefined) setObj.title = input.title;
    if (input.icon !== undefined) setObj.icon = input.icon;
    if (input.parentPageId !== undefined)
      setObj.parentPageId = input.parentPageId;
    setObj.updatedAt = new Date();

    const result = await this.db
      .update(pages)
      .set(setObj)
      .where(eq(pages.id, input.id))
      .returning();

    return this.mapToEntity(result[0] ?? []);
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(pages).where(eq(pages.id, id));
  }

  async softDelete(id: number): Promise<void> {
    await this.db
      .update(pages)
      .set({ deletedAt: new Date() })
      .where(eq(pages.id, id));
  }

  private mapToEntity(row: typeof pages.$inferSelect): Page {
    return {
      id: row.id,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      title: row.title,
      icon: row.icon ?? null,
      parentPageId: row.parentPageId ?? null,
      deletedAt: row.deletedAt ? new Date(row.deletedAt) : null,
      workspaceId: row.workspaceId,
    };
  }
}
