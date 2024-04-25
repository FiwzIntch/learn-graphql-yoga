import { createYoga } from 'graphql-yoga'
import { createFetch } from '@whatwg-node/fetch'
import { schema } from './schema'
import { createServer } from 'http'
import { createContext } from './context'
import { CacheStore } from './interface/cache.interface'
import { DocumentNode, validate } from 'graphql'
import { documentCacheStore, errorCacheStore, validationCacheStore } from '../my-cache'
import { createInMemoryCache, useResponseCache } from '@graphql-yoga/plugin-response-cache'

function main() {

  const yoga = createYoga({
    schema,
    fetchAPI: createFetch({
      formDataLimits: {
        fileSize: 10000
      }
    }),
    plugins: [
      useResponseCache({
        session: (request) => {
          // console.log(request.headers.get('authorization'));
          return request.headers.get('aaa')
        },
        scopePerSchemaCoordinate: {
          'Query.categories': 'PRIVATE',
          // 'User': 'PRIVATE'
        },
        // session: () => null,
        // by default cache all operations for 2 seconds
        // ttl: 3600_000,
        invalidateViaMutation: true
      })
    ],
    context: createContext,
    // parserAndValidationCache: {
    //   documentCache: documentCacheStore as CacheStore<DocumentNode>,
    //   errorCache: errorCacheStore as CacheStore<Error>,
    //   validationCache: validationCacheStore as CacheStore<typeof validate>
    // }
  })


  const server = createServer(yoga)


  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })

}

main()