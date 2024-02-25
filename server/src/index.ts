// import { MikroORM } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constant";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig); // Initialize the mirko-ORM (mikro-orm.config.ts)
  await orm.getMigrator().up();     // Run the migration on the database on every change

  let redisClient = createClient(); // Create a redis client
  redisClient.connect().catch(console.error); // Connect to the redis server

  let redisStore = new RedisStore({  // Create a redis store
    client: redisClient,
    prefix: "bankai:",
    disableTouch: true
  });

  const app = express(); // Create an express app

  // Use the session middleware
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

  // Create an apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver], // Add the resolvers
      validate: false,
    }),
    context: ({req, res}) : MyContext => ({ em: orm.em, req, res }),
  });

  // Start the apollo server
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: {
    origin: "https://studio.apollographql.com",
    credentials: true
  } });

  // Start the express server
  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

// Run the main function
main().catch((err) => {
  console.log(err);
});
