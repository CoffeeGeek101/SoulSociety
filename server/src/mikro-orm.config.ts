import path from "path";
import { __prod__, db_password } from "./constant";
import { Post } from "./entities/Post";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations"
import { User } from "./entities/User";

export default defineConfig({
    extensions: [Migrator],
    entities: [Post, User],  //Add the entities, they are like the tables in the database
    dbName: "stack_db",
    debug: (!__prod__),
    password: db_password, 
    allowGlobalContext: true,
    migrations: {
      path: path.join(__dirname, './migrations'),  // The path to the migrations folder, making the path OS independent
      glob: '!(*.d).{js,ts}',
    }, 
}) as Parameters<typeof defineConfig>[0];