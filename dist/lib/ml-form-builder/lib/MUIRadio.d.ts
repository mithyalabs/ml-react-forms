import { FC } from 'react';
import { IFieldProps } from '../index';
import { RadioGroupProps, RadioProps, FormControlLabelProps, FormLabelProps } from '@material-ui/core';
export declare type MenuOptionObj = {
    name: string;
    value: string;
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
}
interface IProps extends IFieldProps {
    fieldProps?: IMUIRadioProps;
}
export declare const MUIRadio: FC<IProps>;
export {};
