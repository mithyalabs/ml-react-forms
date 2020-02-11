import React, { FC } from 'react';
import { Select, FormControl, FormControlProps, FormHelperText, FormHelperTextProps, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
import { IFieldProps, FormConfig } from '../index';
import { FormikValues } from 'formik';
import { get, map, isString } from 'lodash';
import { MenuOptions, MenuOptionObject, getMenuOptions } from '../Utils';

export interface IMUISelectProps extends SelectProps {
    label?: string
    options?: MenuOptions
    emptyItem?: string | boolean
    helperText?: string
    formControlProps?:FormControlProps
    formHelperTextProps?:FormHelperTextProps
}

export interface IProps extends IFieldProps {
    fieldProps?: IMUISelectProps
}

export const MUISelectField: FC<IProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUISelectProps } = props;
    const { label, options = [], emptyItem, helperText,formControlProps,formHelperTextProps, ...selectProps } = fieldProps;
    const labelId = `${fieldConfig.id}_label`;
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    const menuOptions = getMenuOptions(options);
    const value = get(formikProps, `values.${fieldProps.name}`) || ((selectProps.multiple) ? [] : '');

    return (
        <FormControl error={!!fieldError} {...formControlProps}>
            {
                label &&
                (<InputLabel id={labelId}>{label}</InputLabel>)
            }
            <Select
                labelId={labelId}
                id={fieldConfig.id}
                value={value}
                onChange={formikProps.handleChange}
                {...selectProps}
            >
                {
                    (emptyItem) &&
                    (<MenuItem value="" >
                        <em>{emptyItemText}</em>
                    </MenuItem>)
                }
                {
                    map(menuOptions, (item: MenuOptionObject, index: number) => (<MenuItem key={`${fieldConfig.id}_menu_item_${index}`} value={item.value}>{item.name}</MenuItem>))
                }
            </Select>
            {
                (fieldError || fieldProps.helperText) &&
                (
                    <FormHelperText {...formHelperTextProps}>{fieldError || fieldProps.helperText}</FormHelperText>
                )
            }

        </FormControl>
    )
}