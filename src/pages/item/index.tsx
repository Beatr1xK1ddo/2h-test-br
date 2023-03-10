import { FC, useCallback, useEffect, useMemo } from 'react';
import {useParams} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {Comment} from './comment';
import { StoryStore } from '../../store';
import { CommentsWrap, ControlWrap, ItemCommentsWrap, ItemHeaderWrap, ItemInfoWrap, ItemText, ItemTitle } from './styled';
import { CommentsStore } from '../../store/comments';
import { EStatuses } from '../../types';

type IProps = {
    story?: StoryStore;
    comments?: CommentsStore;
}

export const ItemPage: FC<IProps> = inject('story', 'comments')(observer(({story, comments}) => {
    const {storyId} = useParams()

    const dateTime = useMemo(() => {
        if (story?.story?.time) return new Date(story?.story?.time * 1000).toLocaleDateString('en-US')
    }, [story?.story?.time])

    const commentsCounter = useMemo(() => story?.story?.kids?.length, [story?.story?.kids])

    const forceUpdate = useCallback(() => {
        if (story?.story?.kids?.length) comments?.fetch(story?.story?.kids)
    }, [story?.story?.kids])

    useEffect(() => {
        if (storyId) story?.fetch(parseInt(storyId))
    }, [storyId])

    useEffect(() => {
        if (story?.story?.kids?.length) comments?.fetch(story?.story?.kids)
    }, [story?.story?.kids])

    return (
        <div>
            <ItemHeaderWrap>
                <Breadcrumbs>
                    <Link to='/' >{"<= Back to stories"}</Link>
                </Breadcrumbs>
                <ItemTitle>{story?.story?.title}</ItemTitle>
                <ItemText>{story?.story?.text}</ItemText>
                <ItemInfoWrap>
                    <li>Author: @{story?.story?.by}</li>
                    <li>Date: {dateTime}</li>
                    <li><a href={story?.story?.url}>Visit site</a></li>
                </ItemInfoWrap>
            </ItemHeaderWrap>
            <ItemCommentsWrap>
                <ControlWrap>
                    <Button onClick={forceUpdate} variant="contained">Update</Button>
                    <div>Comments: {commentsCounter || 0}</div>
                </ControlWrap>
                <CommentsWrap>
                    {comments?.status === EStatuses.loading && commentsCounter ? <CircularProgress /> : 
                    comments?.comments?.map((item, i) => <Comment key={i} comment={item} />)}
                </CommentsWrap>
            </ItemCommentsWrap>
        </div>
    )
}))