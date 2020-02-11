import React, { FC } from 'react';
import { IFieldProps, FormConfig } from '../index';
import { Checkbox, FormControl, FormControlProps,FormHelperText,FormHelperTextProps, FormControlLabel, FormControlLabelProps, CheckboxProps, FormLabel, FormLabelProps, FormGroup, FormGroupProps } from '@material-ui/core';
import { FormikValues } from 'formik';
import { get, isEmpty, map, indexOf } from 'lodash';

export interface IMUICheckboxProps extends CheckboxProps {
    label?: string,
    helperText?: string,
    selectOptions?: Array<string>,
    header?: string
    headerProps?: FormLabelProps
    groupProps?: FormGroupProps
    formControlLabelProps?:FormControlLabelProps
    formControlProps?:FormControlProps
    formHelperTextProps?:FormHelperTextProps

}
export interface IProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps
}
export const MUICheckBox: FC<IProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUICheckboxProps } = props;
    const { label, helperText, selectOptions, header, headerProps, groupProps,formControlProps,formHelperTextProps,formControlLabelProps, ...checkboxProps } = fieldProps;
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    const value = get(formikProps, `values.${fieldProps.name}`);

    return (
        <FormControl error={!!fieldError} {...formControlProps}>
            {
                (header) &&
                (
                    <FormLabel {...headerProps}>{header}</FormLabel>
                )
            }
            <FormGroup {...groupProps}>
                {
                    (!isEmpty(selectOptions)) ?
                        (
                            map(selectOptions, (item, index) => (
                                <FormControlLabel
                                    key={`${fieldConfig.id}_check_${index}`}
                                    control={<Checkbox checked={(indexOf(value, item) > -1)} onChange={formikProps.handleChange} value={item}  {...{ ...checkboxProps, id: `${fieldConfig.id}_check_${index}` }} />}
                                    label={item || ''}
                                    {...formControlLabelProps}
                                />
                            ))
                        ) : (
                            <FormControlLabel
                                control={<Checkbox checked={(value || false)} onChange={formikProps.handleChange}  {...checkboxProps} />}
                                label={label || ''}
                                {...formControlLabelProps}
                            />
                        )
                }
            </FormGroup>


            {
                (fieldError || helperText) &&
                (<FormHelperText {...formHelperTextProps}>{fieldError || helperText}</FormHelperText>)
            }
        </FormControl>
    )
}