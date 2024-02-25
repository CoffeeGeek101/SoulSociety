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
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "bankai:",
    disableTouch: true
  });

  const app = express();

  app.use(
    session({
      store : redisStore,
      secret: "hello_world",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // JS frontend cannot access the cookie
        sameSite: "lax", // csrf protection
        secure: __prod__,
      },
      saveUninitialized: false,
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GraphQLStarter, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({req, res}) : MyContext => ({ em: orm.em, req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: {
    origin: "https://studio.apollographql.com",
    credentials: true
  } });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
