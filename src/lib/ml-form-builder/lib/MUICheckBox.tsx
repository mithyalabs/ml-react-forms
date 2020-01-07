import React, { FC } from 'react';
import { IFieldProps, FormConfig } from '../index';
import { Checkbox, FormControl, FormHelperText, FormControlLabel, CheckboxProps } from '@material-ui/core';
import { FormikValues } from 'formik';
import { get, isEmpty, map, indexOf } from 'lodash';

export interface IMUICheckboxProps extends CheckboxProps {
    label?: string,
    helperText?: string,
    selectOptions?: Array<string>
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps
}
export const MUICheckBox: FC<IProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUICheckboxProps } = props;
    const { label, helperText, selectOptions, ...checkboxProps } = fieldProps;
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const value = get(formikProps, `values.${fieldProps.name}`);

    return (
        <FormControl error={!!fieldError}>
            {
                (!isEmpty(selectOptions)) ?
                    (
                        map(selectOptions, (item, index) => (
                            <FormControlLabel
                                key={`${fieldConfig.id}_check_${index}`}
                                control={<Checkbox checked={(indexOf(value, item) > -1)} onChange={formikProps.handleChange} value={item}  {...{ ...checkboxProps, id: `${fieldConfig.id}_check_${index}` }} />}
                                label={item || ''}
                            />
                        ))
                    ) : (
                        <FormControlLabel
                            control={<Checkbox checked={(value || false)} onChange={formikProps.handleChange}  {...checkboxProps} />}
                            label={label || ''}
                        />
                    )
            }

            {
                (fieldError || helperText) &&
                (<FormHelperText>{fieldError || helperText}</FormHelperText>)
            }
        </FormControl>
    )
}