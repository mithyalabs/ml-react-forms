import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IFieldProps } from '../index';
export interface IProps extends IFieldProps {
    fieldProps?: TextFieldProps;
}
export declare const MUITextField: React.FC<IProps>;
export default MUITextField;
