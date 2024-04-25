import { User, Prisma } from "@prisma/client"
import { GraphQLContext } from "../../context"


export default {
  async createCategory(parent: unknown, { data }: { data: Prisma.CategoryCreateInput }, context: GraphQLContext) {
    return context.prisma.category.create({
      data,
    })
  },
  async updateCategory(parent: unknown, { id, data }: { id: string, data: Prisma.CategoryUncheckedUpdateInput }, context: GraphQLContext) {
    return context.prisma.category.update({
      data,
      where: {
        id
      }
    })
  },
  async deleteCategory(parent: unknown, { id }: { id: string }, context: GraphQLContext) {
    return await context.prisma.category.delete({
      where: {
        id
      },
    })
  }
}