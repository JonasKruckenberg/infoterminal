import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'

@ObjectType()
class PlaybackState {
  @Field({ nullable: true })
  source: string = null

  @Field()
  playing: boolean = false

  @Field()
  muted: boolean = false

  @Field()
  volume: number = 1
}

@ObjectType()
class PlaybackStateChange {
  @Field({ nullable: true })
  source: string

  @Field({ nullable: true })
  playing: boolean

  @Field({ nullable: true })
  muted: boolean

  @Field({ nullable: true })
  volume: number
}

@Resolver()
export class PlaybackResolver {
  state = new PlaybackState()

  @Query(returns => PlaybackState)
  playbackState() {}

  @Subscription({
    topics: 'PLAYBACK_STATE_CHANGED'
  })
  playbackStateChanged(@Root() delta: PlaybackStateChange): PlaybackStateChange {
    return delta
  }

  mutate(delta: Partial<PlaybackStateChange>, pubsub: PubSubEngine) {
    this.state = Object.assign(this.state, delta)
    pubsub.publish('PLAYBACK_STATE_CHANGED', delta)
  }

  @Mutation(returns => Boolean)
  play(@Arg('mediaID') mediaID: string) {
    return true
  }

  @Mutation(returns => Boolean)
  resume(@PubSub() pubSub: PubSubEngine) {
    if (!this.state.playing) {
      this.mutate({ playing: true }, pubSub)
      return true
    } else {
      return false
    }
  }

  @Mutation(returns => Boolean)
  pause(@PubSub() pubSub: PubSubEngine) {
    if (this.state.playing) {
      this.mutate({ playing: false }, pubSub)
      return true
    } else {
      return false
    }
  }

  @Mutation(returns => Boolean)
  mute(@PubSub() pubSub: PubSubEngine) {
    if (!this.state.muted) {
      this.mutate({ muted: true }, pubSub)
      return true
    } else {
      return false
    }
  }

  @Mutation(returns => Boolean)
  unmute(@PubSub() pubSub: PubSubEngine) {
    if (this.state.muted) {
      this.mutate({ muted: false }, pubSub)
      return true
    } else {
      return false
    }
  }
}
