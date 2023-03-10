import { CommentStore } from ".";
import CommentsApi from "../../api/stories";
import { IComment } from "../../api/types";
import { EStatuses } from "../../types";

export interface ICommentsState {
    api: CommentsApi;
    comments: Array<CommentStore>;
    status: EStatuses;
    fetch(ids: Array<number>): void;
}

export interface ICommentState {
    api: CommentsApi;
    comment: IComment;
    status: EStatuses;
    subStatus: EStatuses;
    subComments: Array<IComment>;
    fetch(id: number): void;
    fetchSubcomments(): void;
}