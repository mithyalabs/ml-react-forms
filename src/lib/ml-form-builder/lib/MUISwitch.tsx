import React, { FC } from 'react';
import { IFieldProps } from '../index';
import { FormikValues } from 'formik';
import { Switch, SwitchProps, FormControlLabel } from '@material-ui/core';
import { get } from 'lodash';


export interface IMUISwitchProps extends SwitchProps {
    label?: string
}

export interface IProps extends IFieldProps {
    fieldProps?: IMUISwitchProps
}

export const MUISwitch: FC<IProps> = (props) => {
    const { formikProps = {} as FormikValues, fieldProps = {} as IMUISwitchProps } = props;
    const { label, ...switchProps } = fieldProps;
    const value = get(formikProps, `values.${fieldProps.name}`);
    console.log('MUISwitch', formikProps);

    const handleOnChange = () => {
        formikProps.setFieldValue(fieldProps.name, !value);
    }
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={!!value}
                    onChange={handleOnChange}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    value={value}
                    {...switchProps}
                />
            }
            label={label || ''}
        >

        </FormControlLabel>

    )
}