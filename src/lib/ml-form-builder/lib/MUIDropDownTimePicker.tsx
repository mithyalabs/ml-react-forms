import { FormControl, FormControlProps, FormHelperTextProps, InputLabel, InputLabelProps, MenuItem, MenuItemProps, Select, SelectProps, FormHelperText } from '@material-ui/core';
import { FormikValues } from 'formik';
import { get, isString, map } from 'lodash';
import React, { FC } from 'react';
import moment from 'moment'
import { IFieldProps, FormConfig } from '..';
import { MenuOptionObject, getFieldError } from '../Utils';
export interface IMUIDropDownTimePickerProps extends SelectProps {
    label?: string
    emptyItem?: string | boolean
    helperText?: string
    formControlProps?: FormControlProps
    formHelperTextProps?: FormHelperTextProps
    startTime?: string | Date
    endTime?: string | Date
    interval?: number
    amPm?: boolean
    emptyMenuItemProps?: object
    menuItemProps?: object
    inputLabelProps?: object
}
export interface MUIDropDownTimePickerProps extends IFieldProps {
    fieldProps?: IMUIDropDownTimePickerProps
}
const getOptions = (startTime: string | Date, endTime: string | Date, interval: number, amPm: boolean) => {
    let start = amPm ? moment(startTime, 'hh:mm a').toDate() : moment(startTime, 'HH:mm').toDate()
    let end = amPm ? moment(endTime, 'hh:mm a').toDate() : moment(endTime, 'HH:mm').toDate()
    let list: { name: string, value: string }[] = []
    while (start.getTime() <= end.getTime()) {
        let item = amPm ? moment(start).format('hh:mm a') : moment(start).format('HH:mm');
        list.push({ name: item, value: item })
        start = new Date(start.getTime() + interval * 60000)
    }
    return list;
}
export const MUIDropDownTimePicker: FC<MUIDropDownTimePickerProps> = (props) => {
    const { fieldProps = {} as IMUIDropDownTimePickerProps,
        fieldConfig = {} as FormConfig,
        formikProps = {} as FormikValues, } = props;
    const fieldError = getFieldError((fieldProps.name || ''), formikProps);
    const {
        formControlProps = {} as FormControlProps,
        startTime = '00:00',
        endTime = '23:45',
        interval = 15,
        amPm = false,
        label,
        emptyItem,
        helperText,
        inputLabelProps = {} as InputLabelProps,
        formHelperTextProps,
        menuItemProps = {} as MenuItemProps,
        emptyMenuItemProps = {} as MenuItemProps,
        error = !!fieldError,
        ...selectProps
    } = fieldProps
    const labelId = `${fieldConfig.id}_label`;
    const value = get(formikProps, `values.${fieldProps.name}`) || '';
    const list = getOptions(startTime, endTime, interval, amPm)
    const emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    const onChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        event.preventDefault();
        if (event.target.value)
            formikProps.setFieldValue(get(fieldProps, 'name'), event.target.value, false)
    }
    console.log(value)
    return (
        <FormControl {...formControlProps}
        >
            {
                label &&
                (<InputLabel id={labelId} {...inputLabelProps}>{label}</InputLabel>)
            }
            <Select
                labelId={labelId}
                id={fieldConfig.id}
                value={value}
                onChange={onChange}
                error={error}
                {...selectProps}
            >
                {
                    (emptyItem) &&
                    (<MenuItem value='' {...menuItemProps} {...emptyMenuItemProps}>
                        {emptyItemText}
                    </MenuItem>)
                }
                {
                    map(list, (item: MenuOptionObject, index: number) => (<MenuItem {...menuItemProps} key={`${fieldConfig.id}_menu_item_${index}`} value={item.value}>{item.name}</MenuItem>))
                }
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}
