import { PrismaClient, User } from '@prisma/client'
import { YogaInitialContext } from 'graphql-yoga'
import { authenticateUser } from './auth'


const prisma = new PrismaClient()

export type GraphQLContext = {
  prisma: PrismaClient
  currentUser: User | null
}

export async function createContext(initialContext: YogaInitialContext): Promise<GraphQLContext> {
  console.log('create context');

  return {
    prisma,
    currentUser: await authenticateUser(prisma, initialContext.request)
  }
}