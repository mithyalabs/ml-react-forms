import React from 'react';
import { IFieldProps } from '../index';
import { ButtonProps, IconButtonProps, TextFieldProps } from '@material-ui/core';
interface IFieldArrayProps {
    name: string;
    id: string;
    itemType: string;
    addButtonProps?: ButtonProps;
    addButtonText?: string;
    addButton?: JSX.Element;
    removeButton?: JSX.Element;
    removeButtonProps?: IconButtonProps;
    textFieldProps?: TextFieldProps;
}
export interface IProps extends IFieldProps {
    fieldProps?: IFieldArrayProps;
}
export declare const MUIFieldArray: React.FC<IProps>;
export {};
