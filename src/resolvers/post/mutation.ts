import { User, Prisma } from "@prisma/client"
import { GraphQLContext } from "../../context"


export default {
  async createPost(parent: unknown, { data }: { data: Prisma.PostCreateInput }, context: GraphQLContext) {
    return context.prisma.post.create({
      data,
    })
  },
  async updatePost(parent: unknown, { id, data }: { id: string, data: Prisma.PostUncheckedUpdateInput }, context: GraphQLContext) {
    return context.prisma.post.update({
      data,
      where: {
        id
      }
    })
  },
  async deletePost(parent: unknown, { id }: { id: string }, context: GraphQLContext) {
    return context.prisma.post.delete({
      where: {
        id
      },
    })
  }
}