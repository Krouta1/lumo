"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { DrizzleWorkspaceRepository } from "@/infrastructure/repositories";
import type { Workspace } from "@/domain/entities/workspace";

const workspaceRepository = new DrizzleWorkspaceRepository();

export async function getWorkspaces(): Promise<Workspace[]> {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims.sub) {
    return [];
  }

  const workspaces = await workspaceRepository.findByOwnerId(claims.claims.sub);
  return workspaces;
}

export async function getWorkspace(id: string): Promise<Workspace | null> {
  const workspaceId = parseInt(id, 10);

  if (isNaN(workspaceId)) {
    return null;
  }

  const workspace = await workspaceRepository.findById(workspaceId);
  return workspace;
}

export async function createWorkspace(
  name: string,
): Promise<Workspace | { error: string }> {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: claims } = await supabase.auth.getClaims();

  if (!claims?.claims.sub) {
    return { error: "Not authenticated" };
  }

  try {
    const workspace = await workspaceRepository.create({
      name,
      ownerId: claims.claims.sub,
    });
    return workspace;
  } catch (error) {
    console.error("Error creating workspace:", error);
    return { error: "Failed to create workspace" };
  }
}
