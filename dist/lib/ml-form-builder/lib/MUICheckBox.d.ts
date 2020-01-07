import { FC } from 'react';
import { IFieldProps } from '../index';
import { CheckboxProps } from '@material-ui/core';
export interface IMUICheckboxProps extends CheckboxProps {
    label?: string;
    helperText?: string;
    selectOptions?: Array<string>;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps;
}
export declare const MUICheckBox: FC<IProps>;
