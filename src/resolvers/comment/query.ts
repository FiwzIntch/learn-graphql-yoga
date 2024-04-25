import { Comment } from "@prisma/client"
import { GraphQLContext } from "../../context"
import { OffsetListResult, OffsetPageInfo, OffsetPaginationQuery } from "../../interface/list.interface"

export default {
  async comments(parent: unknown, { query }: { query: OffsetPaginationQuery }, context: GraphQLContext)
    : Promise<OffsetListResult<Comment>> {

    const { page, pageSize, sortField, sortOrder } = query

    const offset = (page - 1) * pageSize

    const comments = await context.prisma.comment.findMany({
      take: pageSize,
      skip: offset,
      orderBy: {
        [sortField || 'id']: sortOrder || 'desc'
      }
    })

    const totalItem = await context.prisma.comment.count();
    const totalPage = Math.ceil(totalItem / pageSize)

    const pageInfo: OffsetPageInfo = {
      page,
      pageSize,
      totalPage,
      totalItem
    }

    return {
      results: comments,
      pageInfo,
    }
  },

  comment(parent: unknown, { id }: { id: string }, context: GraphQLContext) {
    return context.prisma.comment.findUnique({
      where: {
        id
      }
    })
  }
}