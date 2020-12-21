/// <reference types="react" />
import { InputBaseComponentProps } from '@material-ui/core';
import { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import { IFieldProps } from '..';
export interface IHighlighterProps {
    highlightText?: boolean;
    highlightColor?: string;
    highlighterStyles?: object;
}
export interface TQueries<T> {
    term: string;
    sendAt: number;
    order: number;
    options?: T[];
}
export interface IMUIAutoCompleteProps<T> extends Partial<AutocompleteProps<T>> {
    options?: T[];
    renderInputProps?: RenderInputParams;
    inputProps?: InputBaseComponentProps;
    highlighterProps?: IHighlighterProps;
    getQueryResponse?: (newTerm: string) => Promise<Array<T>>;
    onItemSelected?: (value: T | T[] | null) => void;
    multiple?: boolean;
    transformValues?: (values: any) => T | T[];
    clearOnSelect?: boolean;
}
export interface IProps<T> extends IFieldProps {
    fieldProps?: IMUIAutoCompleteProps<T>;
}
export declare const MUIAutocomplete: <T extends string | Record<string, any>>(props: IProps<T>) => JSX.Element;
