import * as React from 'react';
import { IFieldProps } from '../index';
import { FormHelperTextProps, FormControlProps, RadioGroupProps, RadioProps, FormControlLabelProps, FormLabelProps } from '@material-ui/core';
import { MenuOptionObject } from '../Utils';
export declare type MenuOptionObj = MenuOptionObject & {
    controlProps?: FormControlLabelProps;
};
export declare type MenuOptions = Array<string> | Array<MenuOptionObj>;
export interface IMUIRadioProps {
    options?: MenuOptions;
    header?: string;
    name?: string;
    id?: string;
    headerProps?: FormLabelProps;
    helperText?: string;
    radioProps?: RadioProps;
    radioGroupProps?: RadioGroupProps;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
}
interface IProps extends IFieldProps {
    fieldProps?: IMUIRadioProps;
}
export declare const MUIRadio: React.FC<IProps>;
export {};
