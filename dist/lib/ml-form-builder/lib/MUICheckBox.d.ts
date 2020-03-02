import * as React from 'react';
import { IFieldProps } from '../index';
import { FormControlProps, FormHelperTextProps, FormControlLabelProps, CheckboxProps, FormLabelProps, FormGroupProps } from '@material-ui/core';
import { MenuOptions } from '../Utils';
export interface IMUICheckboxProps extends CheckboxProps {
    label?: string;
    helperText?: string;
    options?: MenuOptions;
    header?: string;
    headerProps?: FormLabelProps;
    checkGroupProps?: FormGroupProps;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps;
}
export declare const MUICheckBox: React.FC<IProps>;
