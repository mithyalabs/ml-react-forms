import * as React from 'react';
import { Select, FormControl, FormControlProps, FormHelperText, FormHelperTextProps, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
import { IFieldProps, FormConfig } from '../index';
import { FormikValues } from 'formik';
import { get, map, isString } from 'lodash';
import { MenuOptions, MenuOptionObject, getMenuOptions, getFieldError } from '../Utils';

export interface IMUISelectProps extends SelectProps {
    label?: string
    options?: MenuOptions
    emptyItem?: string | boolean
    helperText?: string
    formControlProps?: FormControlProps
    formHelperTextProps?: FormHelperTextProps
}

export interface IProps extends IFieldProps {
    fieldProps?: IMUISelectProps
}

export const MUISelectField: React.FC<IProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUISelectProps } = props;
    const { label, options = [], emptyItem, helperText, formControlProps, formHelperTextProps, ...selectProps } = fieldProps;
    const labelId = `${fieldConfig.id}_label`;
    const fieldError = getFieldError((fieldProps.name || ''), formikProps);
    const emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    const menuOptions = getMenuOptions(options);
    const value = get(formikProps, `values.${fieldProps.name}`) || ((selectProps.multiple) ? [] : '');

    /*Had to explicitly give style to form control as well as select since it would expand beyond its parent width. */
    return (
        <FormControl error={!!fieldError} {...formControlProps}
            style={{
                overflow: 'hidden',
                width: '100%',
                textOverflow: 'ellipsis',
            }}
        >
            {
                label &&
                (<InputLabel id={labelId}>{label}</InputLabel>)
            }
            <Select
                labelId={labelId}
                id={fieldConfig.id}
                value={value}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
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