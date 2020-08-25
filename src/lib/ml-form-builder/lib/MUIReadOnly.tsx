import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { IFieldProps } from '../index';

export interface IProps extends IFieldProps {
    label: React.ReactNode
    value: React.ReactNode
}
export const MUIReadOnly: React.FC<IProps> = (props) => {
    return (
        <div>
            <Typography variant="subtitle1">{props.label || ''}</Typography>
            <Typography>{props.value || 'NA'}</Typography>
        </div>
    )
}

export default MUIReadOnly;