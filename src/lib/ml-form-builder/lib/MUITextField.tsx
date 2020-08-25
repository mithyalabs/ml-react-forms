import * as React from 'react';
import { FormikValues } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { IFieldProps } from '../index';
import { get } from 'lodash';
import { getFieldError } from '../Utils';
import MUIReadOnly from './MUIReadOnly';

export interface IProps extends IFieldProps {
    fieldProps?: TextFieldProps
}

export const MUITextField: React.FC<IProps> = (props) => {
    const { fieldProps = {} as TextFieldProps, formikProps = {} as FormikValues, isReadOnly = false } = props;
    const fieldError = getFieldError((fieldProps.name || ''), formikProps);
    const updatedProps = {
        ...fieldProps,
        error: !!fieldError,
        helperText: fieldError || fieldProps.helperText || '',
        onChange: formikProps.handleChange,
        onBlur: formikProps.handleBlur,
        value: get(formikProps, `values.${fieldProps.name}`) || ''
    };
    console.log('Text field props read only', isReadOnly);
    if (isReadOnly) {
        return (<MUIReadOnly label={updatedProps.label} value={updatedProps.value} />);
    }
    return (
        <TextField {...updatedProps} />
    )
}

export default MUITextField;