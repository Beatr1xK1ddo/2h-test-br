import { FC, useCallback, useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import { SubComment } from './sub-comment';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { CommentWrap } from './styled';
import { CommentStore } from '../../../store/comments';
import { EStatuses } from '../../../types';

type IProps = {
    comment: CommentStore;
}

export const Comment: FC<IProps> = inject('comment')(observer(({comment}) => {

    const loadAllCommentTree = useCallback(() => {
        comment?.fetchSubcomments()
    }, [comment?.fetchSubcomments])

    const subComments =  useMemo(() => {
        if (comment?.subComments.length) {
            return (
                <ul style={{paddingLeft: 50}}>
                    {comment.subComments.map(item => <SubComment key={item.id} comment={item} />)}
                </ul>
            )
        }
        return comment?.subStatus === EStatuses.loading ? 
        <CircularProgress /> 
        : comment?.comment.kids?.length ? 
        <Button variant='text' onClick={loadAllCommentTree}>More info...</Button> 
        : null
    }, [comment?.subComments, comment?.subStatus, comment?.comment.kids, loadAllCommentTree])

    return (
        <CommentWrap>
            <h3>{comment?.comment?.by}</h3>
            <div>{comment?.comment?.text}</div>
            {subComments}
        </CommentWrap>
    )
}))