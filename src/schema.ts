import { makeExecutableSchema } from '@graphql-tools/schema'
import * as fs from 'fs'
import * as UserResolver from './resolvers/user'
import * as PostResolver from './resolvers/post'
import * as CategoryResolver from './resolvers/category'
import * as CommentResolver from './resolvers/comment'
import * as AuthResolver from './resolvers/auth'
import * as FileResolver from './resolvers/file'
import * as TestResolver from './resolvers/test'


const typeDefinitions = fs.readFileSync('src/schema.graphql', 'utf-8')

export const schema = makeExecutableSchema({
  typeDefs: [typeDefinitions],
  resolvers: [
    AuthResolver,
    UserResolver,
    PostResolver,
    CategoryResolver,
    CommentResolver,
    FileResolver,
    TestResolver
  ],
})