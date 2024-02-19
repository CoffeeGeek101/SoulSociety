import path from "path";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations"

export default defineConfig({
    extensions: [Migrator],
    entities: [Post],
    dbName: "stack_db",
    debug: (!__prod__),
    password: "2001",
    allowGlobalContext: true,
    migrations: {
      path: path.join(__dirname, './migrations'),
      glob: '!(*.d).{js,ts}',
    }, 
}) as Parameters<typeof defineConfig>[0];