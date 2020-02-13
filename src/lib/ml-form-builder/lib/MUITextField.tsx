import React, { FC } from 'react';
import { FormikValues } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { IFieldProps } from '../index';
import { get } from 'lodash';
import {getFieldError} from '../Utils';

export interface IProps extends IFieldProps {
    fieldProps?: TextFieldProps
}

export const MUITextField: FC<IProps> = (props) => {
    const { fieldProps = {} as TextFieldProps, formikProps = {} as FormikValues } = props;
    const fieldError = getFieldError((fieldProps.name||''),formikProps);
    const updatedProps = {
        ...fieldProps,
        error: !!fieldError,
        helperText: (fieldError || ''),
        onChange: formikProps.handleChange,
        onBlur:formikProps.handleBlur,
        value: get(formikProps, `values.${fieldProps.name}`) || ''
    };
    return (
        <TextField {...updatedProps} />
    )
}

export default MUITextField;