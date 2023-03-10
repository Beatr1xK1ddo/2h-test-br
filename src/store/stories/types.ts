import { IStory } from "../../api/types";
import { EStatuses } from "../../types";

export interface IStoriesState {
    status: EStatuses;
    stories: Array<IStory>;
    fetch(): void;
}

export interface IStoryState {
    story?: IStory;
    fetch(id: number): void;
}