import { FC } from 'react';
import { observer } from 'mobx-react';
import { IComment } from '../../../../api/types';

type IProps = {
    comment: IComment;
}

export const SubComment: FC<IProps> = observer(({comment}) => {

    return <div>
        <h3>{comment?.by}</h3>
        <div>{comment?.text}</div>
    </div>
})