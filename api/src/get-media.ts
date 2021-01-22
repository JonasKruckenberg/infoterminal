import cacache from 'cacache'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

interface Options {
  CACHE_PATH: string
}

const plugin: FastifyPluginAsync<Options> = async (app, { CACHE_PATH }) => {
  app.get('/media/*', async (req, reply) => {
    const id = req.params['*'] as string
    if (id) {
      return cacache.get.stream.byDigest(CACHE_PATH, id)
    } else {
      reply.status(404).send()
    }
  })
}
export default fp(plugin)
