import { InputBaseComponentProps } from '@material-ui/core';
import { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { IFieldProps } from '..';
export interface IHighlighterProps {
    highlightText?: boolean;
    highlightColor?: string;
    highlighterStyles?: object;
}
declare type TOptions = Record<string, any>;
export interface TQueries {
    term: string;
    sendAt: number;
    order: number;
    options?: TOptions[];
}
export interface IMUIAutoCompleteProps extends Partial<AutocompleteProps<TOptions>> {
    options?: TOptions[];
    renderInputProps?: RenderInputParams;
    inputProps?: InputBaseComponentProps;
    highlighterProps?: IHighlighterProps;
    getQueryResponse?: (newTerm: string) => Promise<Array<TOptions>>;
    outputKey?: string;
    onItemSelected?: (value: TOptions) => void;
    displayKey?: string;
    uniqueKey?: string;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps;
}
export declare const MUIAutocomplete: React.FC<IProps>;
export {};
