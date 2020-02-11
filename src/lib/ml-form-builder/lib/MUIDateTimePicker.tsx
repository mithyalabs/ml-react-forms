import React, { FC } from 'react';
import { KeyboardDatePicker, KeyboardDatePickerProps, TimePicker, TimePickerProps } from '@material-ui/pickers';
import { FormikValues } from 'formik';
import { IFieldProps } from '../index';
import { get } from 'lodash';

export interface IMUIDatePickerProps extends KeyboardDatePickerProps {
    outputFormat?: string
}

export const MUIDatePicker: FC<IFieldProps & { fieldProps?: IMUIDatePickerProps }> = (props) => {
    const { fieldProps = {} as IMUIDatePickerProps, formikProps = {} as FormikValues } = props;
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const { outputFormat, ...datePickerProps } = fieldProps;
    const updatedProps = {
        ...datePickerProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: (date: any) => {
            if(!date){
                formikProps.setFieldValue(fieldProps.name, '', false);
                return;
            }
            console.log('Date changed', date, fieldProps.format);
            const dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'YYYY-MM-DD');
            formikProps.setFieldValue(fieldProps.name, dateValue, false);
        },
        inputValue: get(formikProps, `values.${fieldProps.name}`) || null,
        onError: (error: string) => {
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

export const MUITimePicker: FC<IFieldProps & { fieldProps?: TimePickerProps }> = props => {
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

