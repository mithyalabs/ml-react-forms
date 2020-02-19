import { InputBaseComponentProps } from '@material-ui/core';
import { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { IFieldProps } from '..';
declare type T = {};
export interface IMUIAutoCompleteProps extends Partial<AutocompleteProps<T>> {
    renderInputProps?: RenderInputParams;
    inputProps?: InputBaseComponentProps;
    delay?: number;
    apiUrl?: string;
    params?: object;
    getOptionLabel?: (x: any) => string;
    getRequestParam?: (query: string) => any;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps;
}
export declare const MUIAutocomplete: React.FC<IProps>;
export {};
