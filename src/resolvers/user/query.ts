import { User } from "@prisma/client"
import { GraphQLContext } from "../../context"
import { CursorListResult, CursorPaginationQuery } from "../../interface/list.interface"
import { sleep } from "../../util"




export default {
  async users(parent: unknown, args: { query?: CursorPaginationQuery }, context: GraphQLContext)
    : Promise<CursorListResult<User>> {




    const { take, cursor, sortField, sortOrder } = Object.assign({
      take: 10,
      cursor: '',
      sortField: 'id',
      sortOrder: 'asc'
    }, args.query)

    // if (!context.currentUser) {
    //   throw new Error('Unauthenticated!')
    // }

    await sleep(1000)

    const users = await context.prisma.user.findMany({
      take: take + 1,
      cursor: (cursor) ? { id: cursor } : undefined,
      skip: (cursor) ? 1 : undefined,
      orderBy: {
        [sortField]: sortOrder
      }
    })

    const hasNextPage = (users.length === take + 1)

    if (hasNextPage) {
      users.pop()
    }

    const lastCategory = (users.length > 0) ? users[users.length - 1] : null  // ป้องกันเคสหาแล้วไม่เจอข้อมูล


    return {
      results: users,
      pageInfo: {
        endCursor: lastCategory?.id || null,
        hasNextPage
      }
    }
  },
  async user(parent: unknown, { id }: { id: string }, context: GraphQLContext) {

    await sleep(3000)

    // if (!context.currentUser) {
    //   throw new Error('Unauthenticated!')
    // }

    return context.prisma.user.findUnique({
      where: {
        id
      }
    })
  },
  async me(parent: unknown, { id }: { id: string }, context: GraphQLContext) {

    if (!context.currentUser) {
      throw new Error('Unauthenticated!')
    }

    await sleep(3000)

    return context.currentUser
  }
}