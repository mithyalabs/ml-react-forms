import React, { FC } from 'react';
import { DatePicker, DatePickerProps, TimePicker, TimePickerProps } from '@material-ui/pickers';
import { FormikValues } from 'formik';
import { IFieldProps } from '../index';
import { get } from 'lodash';

export interface IMUIDatePickerProps extends DatePickerProps {
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
            const dateValue = (outputFormat === 'date') ? date : date.format(outputFormat || fieldProps.format || 'YYYY-MM-DD');
            formikProps.setFieldValue(fieldProps.name, dateValue, false)
        },
        value: get(formikProps, `values.${fieldProps.name}`) || '',
        onError: (error: string) => {
            // handle as a side effect
            if (error !== fieldError) {
                formikProps.setFieldError(fieldProps.name, error);
            }
        }
    };

    return (
        <DatePicker
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

