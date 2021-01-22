import 'reflect-metadata'
import Fastify from 'fastify'
import mercurius from 'mercurius'
import cors from 'fastify-cors'
import { buildSchemaSync } from 'type-graphql'
import { CategoryResolver } from './categories'
import { MediaResolver } from './media'
import { PlaybackResolver } from './playback'
import MediaResourcePlugin from './get-media'
import Mdns from './mdns'

new Mdns({
  name: 'infoterminal',
  host: 'infoterminal.local',
  type: 'http',
  port: 3000
})

const CACHE_PATH = './cache'

async function main() {
  /**
   * Public API
   */
  // gql
  //  player
  //    currentlyPlaying
  //
  //  categories
  //    categories
  //    get category(id)
  //
  //  settings
  //    daysOnline: number
  //    get log(from,to): [string]
  //    updatePassword(oldPw,newPw):boolean
  //    uploadMedia(largeArchive):boolean
  //    verifyData():boolean
  //    shutdown():boolean
  //    restart():boolean
  //    reset():boolean
  //
  // /media/:id
  // /media/:id/thumbnail

  const app = Fastify()

  app.register(cors),
    {
      origin: 'localhost'
    }

  app.register(mercurius, {
    graphiql: 'playground',
    schema: buildSchemaSync({
      resolvers: [CategoryResolver, MediaResolver, PlaybackResolver]
    }),
    subscription: true
  })

  app.register(MediaResourcePlugin, {
    CACHE_PATH
  })

  app.listen(3001)
}
main()
