import { Arg, Query, Resolver, Field, ObjectType } from 'type-graphql'
import cacache from 'cacache'
import { CACHE_PATH } from './common'

@ObjectType()
export class MediaResource {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  media: string

  @Field({ nullable: true })
  thumbnail?: string

  @Field({ nullable: true })
  placeholder?: string
}

@Resolver(MediaResource)
export class MediaResolver {
  @Query(returns => MediaResource)
  async mediaResource(@Arg('id') id: string) {
    const { data } = await cacache.get(CACHE_PATH, id)
    return Object.assign(new MediaResource(), JSON.parse(data)) as MediaResource
  }
}
