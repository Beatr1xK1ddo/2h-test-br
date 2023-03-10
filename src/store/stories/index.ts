import { flow, makeAutoObservable, observable, onBecomeObserved } from "mobx";
import { IStory } from "../../api/types";
import { resolver, PromiseFulfilledResult } from "../utils";
import { IStoriesState, IStoryState } from "./types";
import { EStatuses } from "../../types";
import StoriesApi from "../../api/comments";

export class StoriesStore implements IStoriesState {
    api: StoriesApi;
    @observable status: EStatuses = EStatuses.loading;
    @observable stories: Array<IStory> = [];

    constructor() {
        this.api = new StoriesApi()
        makeAutoObservable(this, {}, {autoBind: true})
        onBecomeObserved(this, 'stories', this.fetch)
    }

    @flow *fetch() {
        this.status = EStatuses.loading
        const stories = yield* resolver(this.api.getAllStories());
        const latest = stories.slice(-100)
        const allS = latest.map(id=> this.api.getStory(id))
        const resolvedValues = yield* resolver(Promise.allSettled(allS))
        const values = (resolvedValues as Array<PromiseFulfilledResult<IStory>>)
            .filter(item => item.status === 'fulfilled')
            .map(item => item.value)
            .sort((a,b) => a.time - b.time)
        this.stories = values
        this.status = EStatuses.success
    }

    change = () => this.status = EStatuses.success
}

export class StoryStore implements IStoryState {
    api: StoriesApi;
    @observable story?: IStory;

    constructor() {
        this.api = new StoriesApi()
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @flow *fetch(id: number) {
       const story = yield* resolver(this.api.getStory(id));
       this.story = story
    }
}
