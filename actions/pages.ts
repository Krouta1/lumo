"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { DrizzlePageRepository } from "@/infrastructure/repositories";
import type { Page } from "@/domain/entities/page";

const pageRepository = new DrizzlePageRepository();

export async function getPages(workspaceId: number): Promise<Page[]> {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims.sub) {
    return [];
  }

  const pages = await pageRepository.findByWorkspaceId(workspaceId);
  return pages;
}

export async function getPage(id: string): Promise<Page | null> {
  const pageId = parseInt(id, 10);

  if (isNaN(pageId)) return null;

  const page = await pageRepository.findById(pageId);
  return page;
}

export async function createPage(
  title: string,
  workspaceId: number,
  icon?: string,
  parentPageId?: string,
): Promise<Page | { error: string }> {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims.sub) {
    return { error: "Not authenticated" };
  }

  try {
    const page = await pageRepository.create({
      title,
      workspaceId,
      icon,
      parentPageId,
    });
    return page;
  } catch (error) {
    console.error("Error creating page:", error);
    return { error: "Failed to create page" };
  }
}
