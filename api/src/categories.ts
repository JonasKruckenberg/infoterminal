import cacache from 'cacache'
import {
  Field,
  createUnionType,
  Query,
  Mutation,
  Arg,
  ObjectType,
  InputType,
  FieldResolver,
  Root,
  Resolver
} from 'type-graphql'
import { CACHE_PATH } from './common'
import { MediaResource } from './media'

@ObjectType()
export class Category {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  thumbnail?: string

  @Field(type => [ChildrenUnion])
  children: Array<Category | MediaResource>

  @Field(type => [MediaResource])
  media: MediaResource[]
}

@InputType()
export class newCategoryInput {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  thumbnail?: string

  @Field(type => [String])
  media: Array<string>

  children = []
}

const ChildrenUnion = createUnionType({
  name: 'CategoryChildren',
  types: () => [Category, MediaResource]
})

@Resolver(of => Category)
export class CategoryResolver {
  @Query(returns => [Category])
  categories() {
    return new Promise(resolve => {
      const out = []
      cacache.ls
        .stream(CACHE_PATH)
        .on('data', entry => {
          if (entry.key.split('/').length === 2) {
            out.push(this.category(entry.key))
          }
        })
        .on('end', () => resolve(out))
    })
  }

  @Query(returns => Category)
  async category(@Arg('id') id: string) {
    const { data } = await cacache.get(CACHE_PATH, id)
    return JSON.parse(data)
  }

  @FieldResolver()
  async children(@Root() category: Category) {
    if (category.children?.length) {
      return category.children.map(async id => {
        const identifier = (id as unknown) as string
        if (identifier.startsWith('MediaResource:')) {
          const { data } = await cacache.get(CACHE_PATH, id)
          return Object.assign(new MediaResource(), JSON.parse(data)) as MediaResource
        } else {
          return this.category(identifier)
        }
      })
    } else {
      return []
    }
  }

  @Mutation(returns => String)
  async addCategory(
    @Arg('data') data: newCategoryInput,
    @Arg('parent', { nullable: true, defaultValue: '/categories' }) parent?: string
  ) {
    const id = `${parent}/${data.title}`
    await cacache.put(CACHE_PATH, id, JSON.stringify(data))
    return id
  }
}
