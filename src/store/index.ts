import { CommentsStore } from './comments'
import {StoriesStore, StoryStore} from './stories'
import { IStore } from './types'
export * from './stories'

export const store: IStore = {
    stories: new StoriesStore(),
    story: new StoryStore(),
    comments: new CommentsStore()
}