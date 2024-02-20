import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { SqlEntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql"

export type MyContext = {
    em : SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>
}

// export type PostType = {
//     id : number;
//     title : string;
//     email : string;
//     fullName : string;
// }