import { Post, PostType } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("identity", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("newPost", () => PostType) newPost: PostType,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { ...newPost });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => Int) id : number,
    @Arg("updatedPost", () => PostType, {nullable : true}) updatePost : PostType,
    @Ctx() {em} : MyContext
  ) : Promise<Post | null> {
    const post = await em.findOne(Post, {id});
    if(!post) {
      return null;
    };

    if(typeof updatePost.title !== "undefined") {
      post.title = updatePost.title;
    }else{
      post.title = post.title;
    }

    if(typeof updatePost.email !== "undefined") {
      post.email = updatePost.email;
    }else{
      post.email = post.email;
    }

    if(typeof updatePost.fullName !== "undefined") {
      post.fullName = updatePost.fullName;
    }else{
      post.fullName = post.fullName;
    }
    await em.persistAndFlush(post);
    return post
  }
}
