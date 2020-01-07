import { FC } from 'react';
import { SelectProps } from '@material-ui/core';
import { IFieldProps } from '../index';
export declare type MenuOptions = Array<string> | Array<{
    name: string;
    value: string;
}>;
export interface IMUISelectProps extends SelectProps {
    label?: string;
    options?: MenuOptions;
    emptyItem?: string | boolean;
    helperText?: string;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUISelectProps;
}
export declare const MUISelectField: FC<IProps>;
