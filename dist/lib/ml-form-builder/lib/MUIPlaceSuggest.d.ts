import * as React from 'react';
import { Suggestion, PropTypes } from 'react-places-autocomplete';
import { IFieldProps } from '../index';
import { TextFieldProps, ListProps, ListItemProps } from '@material-ui/core';
declare type IListItemProps = Omit<ListItemProps, 'button'>;
export interface PlacesAutocompleteChildrenProps {
    loading: boolean;
    suggestions: ReadonlyArray<Suggestion>;
    getInputProps: <InputProps extends {}>(options?: InputProps) => {
        type: 'text';
        autoComplete: 'off';
        role: 'combobox';
        'aria-autocomplete': 'list';
        'aria-expanded': boolean;
        'aria-activedescendant': string | undefined;
        disabled: boolean;
        onKeyDown: React.KeyboardEventHandler;
        onBlur: React.FocusEventHandler;
        value: string | undefined;
        onChange: (ev: {
            target: {
                value: string;
            };
        }) => void;
    } & InputProps;
    getSuggestionItemProps: <SuggestionProps extends {}>(suggestion: Suggestion, options?: SuggestionProps) => {
        key: number;
        id: string | undefined;
        role: 'option';
        onMouseEnter: React.MouseEventHandler;
        onMouseLeave: React.MouseEventHandler;
        onMouseDown: React.MouseEventHandler;
        onMouseUp: React.MouseEventHandler;
        onTouchStart: React.TouchEventHandler;
        onTouchEnd: React.TouchEventHandler;
        onClick: React.MouseEventHandler;
    } & SuggestionProps;
}
export interface PlaceSuggestProps {
    name?: string;
    id?: string;
    textFieldProps?: TextFieldProps;
    listProps?: ListProps;
    listItemProps?: IListItemProps;
    placeAutocompleteProps?: PropTypes;
    locationNameKey?: string;
    outputResult?: string;
    listContainerStyle?: object;
}
export interface IProps extends IFieldProps {
    fieldProps?: PlaceSuggestProps;
}
export declare const MUIPlaceSuggest: React.FC<IProps>;
export {};
