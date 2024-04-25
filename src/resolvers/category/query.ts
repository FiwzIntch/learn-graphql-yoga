import { Category } from "@prisma/client"
import { GraphQLContext } from "../../context"
import { CursorListResult, CursorPaginationQuery } from "../../interface/list.interface"
import { sleep } from "../../util"

export default {

  async categories(parent: unknown, args: { query?: CursorPaginationQuery }, context: GraphQLContext)
    : Promise<CursorListResult<Category>> {

    console.log(args);


    const { take, cursor, sortField, sortOrder } = Object.assign({
      take: 10,
      cursor: '',
      sortField: 'id',
      sortOrder: 'asc'
    }, args.query)



    await sleep(3000)

    const categories = await context.prisma.category.findMany({
      take: take + 1,
      cursor: (cursor) ? { id: cursor } : undefined,
      skip: (cursor) ? 1 : undefined,
      orderBy: {
        [sortField]: sortOrder
      }
    })

    const hasNextPage = (categories.length === take + 1)

    if (hasNextPage) {
      categories.pop()
    }

    const lastCategory = (categories.length > 0) ? categories[categories.length - 1] : null  // ป้องกันเคสหาแล้วไม่เจอข้อมูล


    return {
      results: categories,
      pageInfo: {
        endCursor: lastCategory?.id || null,
        hasNextPage
      }
    }
  },

  category(parent: unknown, { id }: { id: string }, context: GraphQLContext) {
    return context.prisma.category.findUnique({
      where: {
        id
      }
    })
  }
}