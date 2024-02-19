// import { MikroORM } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { GraphQLStarter } from "./resolvers/graphStarter";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema : await buildSchema({
      resolvers:[GraphQLStarter],
      validate:false
    })
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({app});


  app.listen(4000, ()=>{
    console.log("Server started on localhost:4000");
  })

};

main().catch((err) => {
  console.log(err)
});