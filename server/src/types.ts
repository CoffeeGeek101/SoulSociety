import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { SqlEntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql"
import { Request, Response } from "express"

// The context is the object that is passed to every resolver
export type MyContext = {
    em : SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>
    res : Response
    req : Request
}

// we are adding a new field to the session object using SessionData interface of express-session
declare module "express-session" {
    interface SessionData {
      userId: number
    }
  }