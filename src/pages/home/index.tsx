import { inject, observer } from 'mobx-react';
import { FC, useEffect, useRef, useMemo, useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { StoriesStore } from '../../store';
import { EStatuses, Optional } from '../../types';
import { HomeItem } from './item';
import { ControlWrap, ItemsWrap } from './styled';

type IProps = {
    stories?: StoriesStore;
}

export const HomePage: FC<IProps> = inject('stories')(observer(({stories}) => {
    const [updateTime, setUpdateTime] = useState<number>(60)
    const timerRef = useRef<Optional<NodeJS.Timeout>>(null)
    const autoupdateRef = useRef<Optional<NodeJS.Timeout>>(null)

    const storiesList = useMemo(
        () => stories?.stories.map(item => <HomeItem key={item.id} item={item}/>), 
    [stories?.stories])

    const forceUpdate = useCallback(() => stories?.fetch(), [stories?.fetch])

    useEffect(() => {
        if (stories?.status === EStatuses.success) {
            timerRef.current = setInterval(() => stories?.fetch(), 1000 * 60)
            autoupdateRef.current = setInterval(() => setUpdateTime(prev => prev - 1), 1000)
        } else setUpdateTime(60)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            if (autoupdateRef.current) clearInterval(autoupdateRef.current)
        }
    }, [stories?.status])

    return (
        <div>
            <ControlWrap>
                <Button onClick={forceUpdate} variant="contained">Refresh stories</Button>
                <div>Autoupdate will be after {updateTime} sec</div>
            </ControlWrap>
            <ItemsWrap>{stories?.status === EStatuses.loading ? <CircularProgress /> : storiesList}</ItemsWrap>
        </div>
    )
}))