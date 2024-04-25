import Query from './query'
import Mutation from './mutation'
import { Post, User } from '@prisma/client'
import { GraphQLContext } from '../../context'

const User = {
  posts(parent: User, args: {}, context: GraphQLContext): Promise<Post[]> {
    return context.prisma.post.findMany({
      where: {
        userId: parent.id
      }
    })
  }
}

export {
  Query,
  Mutation,
  User
}