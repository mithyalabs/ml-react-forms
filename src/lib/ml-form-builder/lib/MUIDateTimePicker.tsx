import * as React from 'react';
import {KeyboardDatePicker, KeyboardDatePickerProps, TimePickerProps,TimePicker } from '@material-ui/pickers';
import { FormikValues } from 'formik';
import { IFieldProps } from '../index';
import { get } from 'lodash';

export interface IMUIDatePickerProps extends KeyboardDatePickerProps {
    outputFormat?: string
}

export const MUIDatePicker: React.FC<IFieldProps & { fieldProps?: IMUIDatePickerProps }> = (props) => {
    const { fieldProps = {} as IMUIDatePickerProps, formikProps = {} as FormikValues } = props;
    const value = get(formikProps, `values.${fieldProps.name}`);
    //const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate | null>(initValue ? initValue : null);
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const { outputFormat, ...datePickerProps } = fieldProps;
    const handleDateChange = (date: any | null) => {
        //setSelectedDate(date);
        if (!date) {
            formikProps.setFieldValue(fieldProps.name, date, false);
            return;
        }
        const dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'MM/DD/YYYY');
        formikProps.setFieldValue(fieldProps.name, dateValue, false);
    };
    const updatedProps = {
        ...datePickerProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: handleDateChange,
        value: (!value) ? null : undefined,
        inputValue: (!value) ? '' : value,
        format: fieldProps.format || 'MM/DD/YYYY',
        onError: (error: React.ReactNode) => {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    };

    return (
        <KeyboardDatePicker
            {...updatedProps}
        />
    )
}

export const MUITimePicker: React.FC<IFieldProps & { fieldProps?: TimePickerProps }> = props => {
    const { fieldProps = {} as TimePickerProps, formikProps = {} as FormikValues } = props;
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const updatedProps = {
        ...fieldProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: (time: any) => formikProps.setFieldValue(fieldProps.name, time, false),
        value: get(formikProps, `values.${fieldProps.name}`) || '',
        onError: (error: string) => {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    };
    return (
        <TimePicker {...updatedProps} />
    )
}

