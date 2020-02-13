import React, { FC, useState } from 'react';
import PlacesAutocomplete, { Suggestion, getLatLng, geocodeByAddress, PropTypes } from 'react-places-autocomplete';
import { FormikValues } from 'formik';
import { IFieldProps } from '../index';
import {getFieldError} from '../Utils';

import { TextField, List, ListItem, ListItemText, InputAdornment, IconButton, TextFieldProps, ListProps, ListItemProps, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';

type IListItemProps = Omit<ListItemProps, 'button'>;
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
        onChange: (ev: { target: { value: string } }) => void;
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
    name?: string,
    id?: string,
    textFieldProps?: TextFieldProps,
    listProps?: ListProps,
    listItemProps?: IListItemProps,
    placeAutocompleteProps?: PropTypes,
    locationNameKey?: string,
    outputResult?: string,
    listContainerStyle?: object
}

interface IFieldLayoutProps extends Omit<PlaceSuggestProps, 'placeAutocompleteProps'> {
    resetField: () => void,
    currentAddress?: string,
    selectedValue?: google.maps.LatLngLiteral,
    placeAutocompleteProps?: PlacesAutocompleteChildrenProps
    formikProps?: FormikValues
}

export interface IProps extends IFieldProps {
    fieldProps?: PlaceSuggestProps
}

interface ISearchFieldProps {
    address?: string,
    value?: google.maps.LatLngLiteral,
    placeAutocompleteProps?: PlacesAutocompleteChildrenProps,
    resetField: () => void,
    formikProps?: FormikValues,
    fieldProps: Pick<PlaceSuggestProps, 'name' | 'id' | 'textFieldProps'>
}

interface IPlaceListProps {
    placeAutocompleteProps?: PlacesAutocompleteChildrenProps,
    listProps?: ListProps,
    listItemProps?: IListItemProps,
    listContainerStyle?: object
}


const SearchField: FC<ISearchFieldProps> = props => {
    const { address, fieldProps, placeAutocompleteProps = {} as PlacesAutocompleteChildrenProps, value, resetField, formikProps = {} as FormikValues } = props;
    
    const inputProps = (value && value.lat && value.lng) ? ({
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    aria-label="remove selected place"
                    edge="end"
                    onClick={() => resetField()}
                >
                    <Close />
                </IconButton>
            </InputAdornment>
        )
    }) : {};
    const { textFieldProps = {} as TextFieldProps } = fieldProps;
    const fieldInputProps = { ...textFieldProps.InputProps, ...inputProps };
    const fieldError = getFieldError((fieldProps.name||''),formikProps);
    const updatedProps = {
        ...{ ...textFieldProps, InputProps: fieldInputProps },
        error: !!fieldError,
        helperText: (fieldError || ''),
        name:fieldProps.name
    };
    return (
        <div>
            <TextField value={address || ''}    {...placeAutocompleteProps.getInputProps({
                label: textFieldProps.label || 'Search Places',
                className: 'location-search-input',
                onBlur:formikProps.handleBlur
            })} {...updatedProps} />
        </div>
    )
}

const LIST_CONTAINER_STYLES: object = { position: 'absolute', left: 0, top: '100%', right: 0, zIndex: 500 };

const PlaceList: FC<IPlaceListProps> = props => {
    const { placeAutocompleteProps = {} as PlacesAutocompleteChildrenProps, listProps, listItemProps, listContainerStyle } = props;
    const { suggestions, getSuggestionItemProps } = placeAutocompleteProps;
    return (
        <div className="autocomplete-dropdown-container">
            <Paper style={{ ...LIST_CONTAINER_STYLES, ...listContainerStyle, visibility: ((suggestions.length) ? 'visible' : 'hidden') }}>
                <List {...listProps} >
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = { cursor: 'pointer' };
                        return (
                            <ListItem disableGutters={true} dense={true} selected={suggestion.active} key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                            })} {...{ ...listItemProps }} >
                                <ListItemText primary={suggestion.formattedSuggestion.mainText}
                                    secondary={suggestion.formattedSuggestion.secondaryText} />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </div>
    )
}

const FieldLayout: FC<IFieldLayoutProps> = props => {
    const { currentAddress, selectedValue, placeAutocompleteProps, name, id, textFieldProps } = props;
    return (
        <div>
            <SearchField resetField={props.resetField}
                address={currentAddress}
                value={selectedValue}
                placeAutocompleteProps={placeAutocompleteProps}
                formikProps={props.formikProps}
                fieldProps={{ name, id, textFieldProps }}
            />
            <PlaceList
                placeAutocompleteProps={placeAutocompleteProps}
                listContainerStyle={props.listContainerStyle}
            />
        </div>
    )
}

export const MUIPlaceSuggest: FC<IProps> = (props) => {
    const { fieldProps = {} as PlaceSuggestProps, formikProps = {} as FormikValues } = props;
    const [address, setAddress] = useState('');
    const { placeAutocompleteProps, locationNameKey, outputResult, ...fieldLayoutProps } = fieldProps;
    const selectedValue = formikProps.values[(fieldProps.name || '')];
    const locationName = formikProps.values[(locationNameKey || '')];

    React.useEffect(() => {
        setAddress(locationName || '');
    }, []);

    const handleChange = (address: string) => {
        setAddress(address);
    }
    const handleSelect = async (address: string) => {
        const geoAdress = await geocodeByAddress(address);
        const selectedAddress = geoAdress[0];
        if (!selectedAddress)
            return;
        const latLng = await getLatLng(selectedAddress);
        formikProps.setFieldValue(fieldProps.name, latLng);
        setAddress(selectedAddress.formatted_address);
        if (locationName)
            formikProps.setFieldValue(locationNameKey, selectedAddress.formatted_address);
        if (outputResult)
            formikProps.setFieldValue(outputResult, selectedAddress);
    }
    const resetField = () => {
        setAddress('');
        formikProps.setFieldValue(fieldProps.name);
    }
    return (
        <div style={{ position: 'relative' }}>
            <PlacesAutocomplete value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                {...placeAutocompleteProps}
            >
                {(placeCompleteProps: PlacesAutocompleteChildrenProps) => (
                    <FieldLayout
                        placeAutocompleteProps={placeCompleteProps}
                        resetField={resetField}
                        currentAddress={address}
                        selectedValue={selectedValue}
                        formikProps={formikProps}
                        {...fieldLayoutProps}
                    />)}
            </PlacesAutocomplete>
        </div>
    )
}