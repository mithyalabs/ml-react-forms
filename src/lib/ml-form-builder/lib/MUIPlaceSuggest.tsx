import React, { FC, useState } from 'react';
import PlacesAutocomplete, { Suggestion, getLatLng, geocodeByAddress, PropTypes } from 'react-places-autocomplete';
import { FormikValues } from 'formik';
import { IFieldProps } from '../index';
// import { get } from 'lodash';

import { TextField, List, ListItem, ListItemText, InputAdornment, IconButton, TextFieldProps, ListProps, ListItemProps } from '@material-ui/core';
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
    placeAutocompleteProps?: PropTypes
}

interface IFieldLayoutProps {
    resetField: () => void,
    currentAddress?: string,
    selectedValue?: google.maps.LatLngLiteral,
    placeAutocompleteProps?: PlacesAutocompleteChildrenProps
}

export interface IProps extends IFieldProps {
    fieldProps?: PlaceSuggestProps
}

interface ISearchFieldProps {
    address?: string,
    value?: google.maps.LatLngLiteral,
    textFieldProps?: TextFieldProps,
    placeAutocompleteProps?: PlacesAutocompleteChildrenProps,
    resetField: () => void,
    formikProps?: FormikValues
}

interface IPlaceListProps {
    placeAutocompleteProps?: PlacesAutocompleteChildrenProps,
    listProps?: ListProps,
    listItemProps?: IListItemProps
}


const SearchField: FC<ISearchFieldProps> = props => {
    const { address, textFieldProps = {} as TextFieldProps, placeAutocompleteProps = {} as PlacesAutocompleteChildrenProps, value, resetField } = props;
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
    const fieldInputProps = { ...textFieldProps.InputProps, inputProps };
    /* const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const updatedProps = {
        ...fieldProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: formikProps.handleChange,
        value: get(formikProps, `values.${fieldProps.name}`) || ''
    }; */
    return (
        <div>
            <TextField value={address || ''}   {...placeAutocompleteProps.getInputProps({
                label: textFieldProps.label || 'Search Places',
                className: 'location-search-input'
            })} {...{ ...textFieldProps, InputProps: fieldInputProps }} />
        </div>
    )
}



const PlaceList: FC<IPlaceListProps> = props => {
    const { placeAutocompleteProps = {} as PlacesAutocompleteChildrenProps, listProps, listItemProps } = props;
    const { suggestions, getSuggestionItemProps } = placeAutocompleteProps;
    return (
        <div className="autocomplete-dropdown-container">

            <List {...listProps}>
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <ListItem disableGutters={true} dense={true} key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                        })} {...{ ...listItemProps }} >
                            <ListItemText primary={suggestion.formattedSuggestion.mainText}
                                secondary={suggestion.formattedSuggestion.secondaryText} />
                        </ListItem>
                    )
                })}
            </List>

        </div>
    )
}

const FieldLayout: FC<IFieldLayoutProps> = props => {
    const { currentAddress, selectedValue, placeAutocompleteProps } = props;
    return (
        <div>
            <SearchField resetField={props.resetField}
                address={currentAddress}
                value={selectedValue}
                placeAutocompleteProps={placeAutocompleteProps}
            />
            <PlaceList placeAutocompleteProps={placeAutocompleteProps} />
        </div>
    )
}

export const MUIPlaceSuggest: FC<IProps> = (props) => {
    const { fieldProps = {} as PlaceSuggestProps, formikProps = {} as FormikValues } = props;
    const [address, setAddress] = useState('');
    const [selectedValue, setSelectedValue] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    const { placeAutocompleteProps, ...fieldLayoutProps } = fieldProps;
    const fieldName = fieldProps.name || '';
    React.useEffect(() => {
        console.log('Fetch address by lat lng', formikProps.values[fieldName]);
    }, [])
    const handleChange = (address: string) => {
        setAddress(address);
    }
    const handleSelect = async (address: string) => {
        const geoAdress = await geocodeByAddress(address);
        const latLng = await getLatLng(geoAdress[0]);
        formikProps.setFieldValue(fieldProps.name, latLng);
        setSelectedValue(latLng);
    }
    const resetField = () => {
        setAddress('');
        formikProps.setFieldValue(fieldProps.name);
        setSelectedValue({ lat: 0, lng: 0 })
    }
    return (
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
                    {...fieldLayoutProps}
                />)}
        </PlacesAutocomplete>
    )
}