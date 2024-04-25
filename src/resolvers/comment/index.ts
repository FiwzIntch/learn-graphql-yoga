import Query from './query'
import Mutation from './mutation'
import { Comment, Post } from '@prisma/client'
import { GraphQLContext } from '../../context'
import { GraphQLError } from 'graphql'

const Comment = {
  async post(parent: Comment, args: {}, context: GraphQLContext): Promise<Post> {

    const post = await context.prisma.post.findUnique({
      where: {
        id: parent.postId
      }
    })

    if (!post) {
      throw new GraphQLError('can not get post')
    }

    return post
  }
}



export {
  Query,
  Mutation,
  Comment
}