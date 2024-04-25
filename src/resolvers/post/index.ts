import Query from './query'
import Mutation from './mutation'
import { Category, Post, Comment } from '@prisma/client'
import { GraphQLContext } from '../../context'

const Post = {
  user(parent: Post, args: {}, context: GraphQLContext) {
    return context.prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    })
  },
  async category(parent: Post, args: {}, context: GraphQLContext): Promise<Category | null> {

    if (!parent.categoryId) {
      return null
    }

    return context.prisma.category.findUnique({
      where: {
        id: parent.categoryId
      }
    })
  },
  async comments(parent: Post, args: {}, context: GraphQLContext): Promise<Comment[]> {
    const comments = await context.prisma.comment.findMany({
      where: {
        postId: parent.id
      }
    })

    return comments
  }
}

export {
  Query,
  Mutation,
  Post
}