export interface CursorListResult<T> {
  results: T[]
  pageInfo: CursorPageInfo
}


export interface OffsetListResult<T> {
  results: T[]
  pageInfo: OffsetPageInfo
}

export interface CursorPageInfo {
  endCursor: string | null
  hasNextPage: boolean
}

export interface OffsetPageInfo {
  page: number
  pageSize: number
  totalItem: number
  totalPage: number
}

type OrderQuery = 'asc' | 'desc'

interface BaseQuery {
  sortField?: string | null,
  sortOrder?: OrderQuery | null
}

export interface CursorPaginationQuery extends BaseQuery {
  take?: number | null
  cursor?: string | null
}


export interface OffsetPaginationQuery extends BaseQuery {
  page: number
  pageSize: number
}