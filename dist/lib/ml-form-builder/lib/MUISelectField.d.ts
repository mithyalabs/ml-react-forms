import { FC } from 'react';
import { FormControlProps, FormHelperTextProps, SelectProps } from '@material-ui/core';
import { IFieldProps } from '../index';
import { MenuOptions } from '../Utils';
export interface IMUISelectProps extends SelectProps {
    label?: string;
    options?: MenuOptions;
    emptyItem?: string | boolean;
    helperText?: string;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUISelectProps;
}
export declare const MUISelectField: FC<IProps>;
