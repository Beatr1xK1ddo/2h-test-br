import { flow, makeAutoObservable, observable } from "mobx";
import { IComment } from "../../api/types";
import { EStatuses } from "../../types";
import { resolver } from "../utils";
import CommentsApi from '../../api/stories';
import { ICommentsState, ICommentState } from "./types";

export class CommentsStore implements ICommentsState {
    api: CommentsApi;
    @observable comments: Array<CommentStore> = [];
    @observable status: EStatuses = EStatuses.loading;

    constructor() {
        this.api = new CommentsApi()
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @flow *fetch(ids: Array<number>) {
        this.status = EStatuses.loading
        const allS = ids.map(id=> this.api.getComment(id))
        const resolvedValues = yield* resolver(Promise.allSettled(allS))
        const values = (resolvedValues as Array<PromiseFulfilledResult<IComment>>)
            .filter(item => item.status === 'fulfilled')
            .map(item => new CommentStore(item.value))
        this.comments = values
        this.status = EStatuses.success
    }
}

export class CommentStore implements ICommentState {
    api: CommentsApi;
    @observable comment: IComment;
    @observable status: EStatuses = EStatuses.loading;
    @observable subStatus: EStatuses = EStatuses.success;
    @observable subComments: Array<IComment> = [];

    constructor(comment: IComment) {
        this.comment = comment;
        this.api = new CommentsApi()
        makeAutoObservable(this, {}, {autoBind: true})
    }

    @flow *fetch(id: number) {
        this.status = EStatuses.loading
        const comment = yield* resolver(this.api.getComment(id));
        this.comment = comment
        this.status = EStatuses.success
    }

    @flow *fetchSubcomments() {
        this.subStatus = EStatuses.loading
        const allS = this.comment?.kids.map(id=> this.api.getComment(id))
        const resolvedValues = yield* resolver(Promise.allSettled(allS))
        const values = (resolvedValues as Array<PromiseFulfilledResult<IComment>>)
            .filter(item => item.status === 'fulfilled')
            .map(item => item.value)
        this.subComments = values
        this.subStatus = EStatuses.success
    }
}
