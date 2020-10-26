import * as React from 'react';
import { IFieldProps, FormConfig } from '../index';
import { Checkbox, FormControl, FormControlProps, FormHelperText, FormHelperTextProps, FormControlLabel, FormControlLabelProps, CheckboxProps, FormLabel, FormLabelProps, FormGroup, FormGroupProps } from '@material-ui/core';
import { FormikValues } from 'formik';
import { get, isEmpty, map, indexOf } from 'lodash';
import { getFieldError, getMenuOptions, MenuOptions, MenuOptionObject } from '../Utils';

export interface IMUICheckboxProps extends CheckboxProps {
    label?: string,
    helperText?: string,
    options?: MenuOptions,
    header?: string
    headerProps?: FormLabelProps
    checkGroupProps?: FormGroupProps
    formControlLabelProps?: FormControlLabelProps
    formControlProps?: FormControlProps
    formHelperTextProps?: FormHelperTextProps;

    isLabelHtmlString?: boolean;

}
export interface ICheckboxProps extends IFieldProps {
    fieldProps?: IMUICheckboxProps
}
export const MUICheckBox: React.FC<ICheckboxProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUICheckboxProps } = props;
    const { label = '', helperText, options = [], header, headerProps, checkGroupProps, formControlProps, formHelperTextProps, formControlLabelProps, isLabelHtmlString = false, ...checkboxProps } = fieldProps;
    const fieldError = getFieldError((fieldProps.name || ''), formikProps);
    const value = get(formikProps, `values.${fieldProps.name}`);
    const menuOptions = getMenuOptions(options);
    return (
        <FormControl error={!!fieldError} {...formControlProps}>
            {
                (header) &&
                (
                    <FormLabel {...headerProps}>{header}</FormLabel>
                )
            }
            <FormGroup {...checkGroupProps}>
                {
                    (!isEmpty(menuOptions)) ?
                        (
                            map(menuOptions, (item: MenuOptionObject, index) => (
                                <FormControlLabel
                                    key={`${fieldConfig.id}_check_${index}`}
                                    control={<Checkbox checked={(indexOf(value, item.value) > -1)} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} value={item.value}  {...{ ...checkboxProps, id: `${fieldConfig.id}_check_${index}` }} />}
                                    label={item.name || ''}
                                    {...formControlLabelProps}
                                />
                            ))
                        ) : (
                            <FormControlLabel
                                control={<Checkbox checked={(value || false)} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange}  {...checkboxProps} />}
                                label={isLabelHtmlString ? <div dangerouslySetInnerHTML={{ __html: label }} /> : label}
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
