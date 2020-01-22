import { FC } from 'react';
import { IFieldProps } from '../index';
import { RadioGroupProps, RadioProps, FormControlLabelProps, FormLabelProps } from '@material-ui/core';
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
}
interface IProps extends IFieldProps {
    fieldProps?: IMUIRadioProps;
}
export declare const MUIRadio: FC<IProps>;
export {};
