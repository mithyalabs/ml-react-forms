import { InputBaseComponentProps } from '@material-ui/core';
import { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { IFieldProps } from '..';
declare type T = {};
export interface IHighlighterProps {
    highlightText?: boolean;
    highlightColor?: string;
    highlighterStyles?: object;
}
export interface IMUIAutoCompleteProps extends Partial<AutocompleteProps<T>> {
    options?: {
        name?: string;
        title?: string;
    }[];
    renderInputProps?: RenderInputParams;
    inputProps?: InputBaseComponentProps;
    delay?: number;
    apiUrl?: string;
    params?: object;
    getOptionLabel?: (x: any) => string;
    getRequestParam?: (query: string) => any;
    highlighterProps?: IHighlighterProps;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps;
}
export declare const MUIAutocomplete: React.FC<IProps>;
export {};
