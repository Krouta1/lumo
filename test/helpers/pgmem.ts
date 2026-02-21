import { newDb } from "pg-mem";
import { drizzle } from "drizzle-orm/postgres-js";

export async function createTestDb() {
  const db = newDb({ autoCreateForeignKeyIndices: true });

  // Minimal schema for workspaces needed by repository tests
  db.public.none(`
    CREATE TABLE workspaces (
      id bigserial primary key,
      created_at timestamptz DEFAULT now() NOT NULL,
      name text NOT NULL DEFAULT '',
      owner_id uuid NOT NULL
    );
  `);

  // create a postgres-compatible client adapter for drizzle
  // pg-mem's createPg returns a 'pg' client compatible with node-postgres
  const adapter = db.adapters.createPg();

  // Build a minimal wrapper around the pg-mem adapter to match the API
  // expected by drizzle-orm/postgres-js (client.unsafe, client.begin, options)
  const client = {
    options: { parsers: {}, serializers: {} },
    async unsafe(query: string, params?: any[]) {
      let res: any;
      if (typeof adapter.query === "function") {
        res = await adapter.query(query, params || []);
      } else if (typeof adapter === "function") {
        res = await adapter(query, params || []);
      } else if (adapter.client && typeof adapter.client.query === "function") {
        res = await adapter.client.query(query, params || []);
      } else {
        throw new Error("pg-mem adapter has no query function");
      }
      const rows = res?.rows ?? res ?? [];
      return {
        values() {
          return rows;
        },
        // also allow awaiting the object directly to get rows
        then(onfulfilled: any) {
          return Promise.resolve(rows).then(onfulfilled);
        },
      };
    },
    async begin(fn: any) {
      // pg-mem doesn't require real transaction handling for these tests
      return fn(client);
    },
    async savepoint(fn: any) {
      return fn(client);
    },
  };

  const drizzleDb = drizzle(client as any);

  return { db: drizzleDb, mem: db };
}
