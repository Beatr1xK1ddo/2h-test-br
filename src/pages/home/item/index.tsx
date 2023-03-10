import { FC, useMemo, useCallback } from 'react';
import {useNavigate} from 'react-router-dom'
import { IStory } from '../../../api/types';
import { ItemContainer, ItemInfoWrap, ItemTitle } from './styled';


type IProps = {
    item: IStory;
}

export const HomeItem: FC<IProps> = ({item}) => {

    const navigate = useNavigate()

    const goStoryPage = useCallback(() => navigate(`/story/${item.id}`), [item.id, navigate])

    const date = useMemo(() => {
        if (item.time) return new Date(item.time * 1000).toLocaleDateString('en-US')
    }, [item.time])
    
    return (
        <ItemContainer>
            <ItemTitle onClick={goStoryPage}>{item?.title}</ItemTitle>
            <ItemInfoWrap>
                <li>score: {item?.score}</li>
                <li>author: {item?.by}</li>
                <li>date: {date}</li>
            </ItemInfoWrap>
        </ItemContainer>
    )
}