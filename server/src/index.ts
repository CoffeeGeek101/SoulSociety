// import { MikroORM } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";


const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: "my first post", fullName: "John Doe", email: "" });
  // await orm.em.persistAndFlush(post);
  const post = await orm.em.find(Post, {});
  console.log(post)
};

main().catch((err) => {
  console.log(err)
});