// import { MikroORM } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constant";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { GraphQLStarter } from "./resolvers/graphStarter";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema : await buildSchema({
      resolvers:[GraphQLStarter, PostResolver, UserResolver],
      validate:false
    }),
    context: () => ({em: orm.em})
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({app});

  // await orm.migrator.up();
  // const creat_post = orm.em.create(Post, {fullName: "my first post", email:"a@gmail.com", title:"dummy add"});
  // await orm.em.persistAndFlush(creat_post);

  // const post = await orm.em.find(Post, {});
  // console.log(post)

  app.listen(4000, ()=>{
    console.log("Server started on localhost:4000");
  })

};

main().catch((err) => {
  console.log(err)
});