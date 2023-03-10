import { CommentsStore } from "./comments";
import { StoriesStore, StoryStore } from "./stories";

export interface IStore {
    stories: StoriesStore;
    story: StoryStore;
    comments: CommentsStore;
}