import Query from './query'
import Mutation from './mutation'
import { Category, Post } from '@prisma/client'
import { GraphQLContext } from '../../context'

const Category = {
  posts(parent: Category, args: {}, context: GraphQLContext): Promise<Post[]> {
    return context.prisma.post.findMany({
      where: {
        categoryId: parent.id
      }
    })
  }
}

export {
  Query,
  Mutation,
  Category,
}