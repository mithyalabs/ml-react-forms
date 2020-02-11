import { FC } from 'react';
import { IFieldProps } from '../index';
import { FormControlProps, FormHelperTextProps, FormControlLabelProps, CheckboxProps, FormLabelProps, FormGroupProps } from '@material-ui/core';
export interface IMUICheckboxProps extends CheckboxProps {
    label?: string;
    helperText?: string;
    selectOptions?: Array<string>;
    header?: string;
    headerProps?: FormLabelProps;
    groupProps?: FormGroupProps;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps;
}
export declare const MUICheckBox: FC<IProps>;
