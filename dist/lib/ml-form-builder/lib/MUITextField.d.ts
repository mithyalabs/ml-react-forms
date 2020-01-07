import { FC } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IFieldProps } from '../index';
export interface IProps extends IFieldProps {
    fieldProps?: TextFieldProps;
}
export declare const MUITextField: FC<IProps>;
export default MUITextField;
