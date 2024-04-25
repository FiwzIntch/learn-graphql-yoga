import { hash } from "bcryptjs"
import { User, Prisma } from "@prisma/client"
import { GraphQLContext } from "../../context"

export default {
  async createUser(parent: unknown, { data }: { data: Prisma.UserCreateInput }, context: GraphQLContext): Promise<User> {

    const password = await hash(data.password, 10)

    const user = await context.prisma.user.create({
      data: {
        ...data,
        password
      },
    })

    return user
  },
  async updateUser(parent: unknown, { id, data }: { id: string, data: Prisma.UserUpdateInput }, context: GraphQLContext)
    : Promise<User> {

    if (data.password) {
      data.password = await hash(data.password.toString(), 10);
    }

    return context.prisma.user.update({
      data,
      where: {
        id
      }
    })
  },
  async deleteUser(parent: unknown, { id }: { id: string }, context: GraphQLContext) {
    return context.prisma.user.delete({
      where: {
        id
      },
    })
  }
}