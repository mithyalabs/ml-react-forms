import { InputBaseComponentProps } from '@material-ui/core';
import { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { IFieldProps } from '..';
export interface IHighlighterProps {
    highlightText?: boolean;
    highlightColor?: string;
    highlighterStyles?: object;
}
declare type TOptions = {
    key: string;
    label: string;
};
export interface IMUIAutoCompleteProps extends Partial<AutocompleteProps<TOptions>> {
    options?: TOptions[];
    renderInputProps?: RenderInputParams;
    inputProps?: InputBaseComponentProps;
    apiUrl?: string;
    params?: object;
    getOptionLabel?: (x: any) => string;
    getRequestParam?: (query: string) => any;
    highlighterProps?: IHighlighterProps;
    getQueryResponse?: (newTerm: string) => Promise<Array<TOptions | string>>;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps;
}
export declare const MUIAutocomplete: React.FC<IProps>;
export {};
