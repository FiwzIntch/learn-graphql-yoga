import { Post } from "@prisma/client"
import { GraphQLContext } from "../../context"
import { OffsetListResult, OffsetPageInfo, OffsetPaginationQuery } from "../../interface/list.interface"

export default {
  async posts(parent: unknown, { query }: { query: OffsetPaginationQuery }, context: GraphQLContext)
    : Promise<OffsetListResult<Post>> {

    const { page, pageSize, sortField, sortOrder } = query

    const offset = (page - 1) * pageSize

    const posts = await context.prisma.post.findMany({
      take: pageSize,
      skip: offset,
      orderBy: {
        [sortField || 'id']: sortOrder || 'desc'
      }
    })

    const totalItem = await context.prisma.post.count();
    const totalPage = Math.ceil(totalItem / pageSize)

    const pageInfo: OffsetPageInfo = {
      page,
      pageSize,
      totalPage,
      totalItem
    }

    return {
      results: posts,
      pageInfo,
    }
  },

  post(parent: unknown, { id }: { id: string }, context: GraphQLContext) {

    return context.prisma.post.findUnique({
      where: {
        id
      }
    })
  }
}