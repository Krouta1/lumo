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
