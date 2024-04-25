import { User, Prisma } from "@prisma/client"
import { GraphQLContext } from "../../context"


export default {
  async createComment(parent: unknown, { data }: { data: Prisma.CommentCreateInput }, context: GraphQLContext) {
    return context.prisma.comment.create({
      data,
    })
  },
  async updateComment(parent: unknown, { id, data }: { id: string, data: Prisma.CommentUncheckedUpdateInput }, context: GraphQLContext) {
    return context.prisma.comment.update({
      data,
      where: {
        id
      }
    })
  },
  async deleteComment(parent: unknown, { id }: { id: string }, context: GraphQLContext) {
    return context.prisma.comment.delete({
      where: {
        id
      },
    })
  }
}