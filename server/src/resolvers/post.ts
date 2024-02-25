import { Post, PostType } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

// This is a resolver for the Post entity
@Resolver() // This is a resolver decorator

export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("identity", () => Int) id: number,  //Args are the parameters that the resolver takes
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });  // Find the post with the given id, ORM will handle the rest
  }

  @Mutation(() => Post)
  async createPost(
     // here we are passing the table column as a object rather than passing them as individual parameters
    @Arg("newPost", () => PostType) newPost: PostType, 
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { ...newPost });  // we need to destruct the newPost object to pass it to the create method
    await em.persistAndFlush(post);  // Save the post to the database
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    // here we are passing the table column as a object rather than passing them as individual parameters
    @Arg("id", () => Int) id : number,  // id to query the post
    @Arg("updatedPost", () => PostType, {nullable : true}) updatePost : PostType, // the updated post, see POST entity for the type
    @Ctx() {em} : MyContext
  ) : Promise<Post | null> {
    const post = await em.findOne(Post, {id});
    if(!post) {
      return null;
    };

    Object.assign(post, updatePost); // Assign the updated post to the post, we are copying the updatedPost to the post

    await em.persistAndFlush(post);
    return post
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id : number,
    @Ctx() {em} : MyContext
  ) : Promise<Boolean> {
    await em.nativeDelete(Post, {id})
    return true;
  }
}
