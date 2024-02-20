import { Query, Resolver } from "type-graphql";

@Resolver()
export class GraphQLStarter {
    @Query(() => String)
    hello(){
        return "Only if Susmita is here, I will say hello to her."
    }
}