import React, { FC } from 'react';
import { IFieldProps } from '../index';
import { FormikValues } from 'formik';
import { FormLabel, FormControlLabel, FormHelperText, FormControl, RadioGroup, RadioGroupProps, Radio, RadioProps, FormControlLabelProps, FormLabelProps } from '@material-ui/core';
import { get, map } from 'lodash';
import { MenuOptionObject, getMenuOptions } from '../Utils';

export type MenuOptionObj = MenuOptionObject & { controlProps?: FormControlLabelProps };
export type MenuOptions = Array<string> | Array<MenuOptionObj>;
export interface IMUIRadioProps {
    options?: MenuOptions
    header?: string
    name?: string
    id?: string,
    headerProps?: FormLabelProps,
    helperText?: string,
    radioProps?: RadioProps,
    radioGroupProps?: RadioGroupProps
}

interface IProps extends IFieldProps {
    fieldProps?: IMUIRadioProps
}

export const MUIRadio: FC<IProps> = props => {
    const { fieldProps = {} as IMUIRadioProps, formikProps = {} as FormikValues } = props;
    const { header, options = [], headerProps, helperText, radioProps, radioGroupProps } = fieldProps;
    const value = get(formikProps, `values.${fieldProps.name}`) || '';
    const menuOptions = getMenuOptions(options);
    const fieldError = get(formikProps, `errors.${fieldProps.name}`);
    return (
        <FormControl error={!!fieldError}>
            {
                (header) &&
                (<FormLabel {...headerProps}>{header}</FormLabel>)
            }
            <RadioGroup name={fieldProps.name} value={value} onChange={formikProps.handleChange} {...radioGroupProps}>
                {
                    map(menuOptions, (option: MenuOptionObj, index: number) => {
                        const { value, name, ...rest } = option;
                        return (
                            <FormControlLabel
                                key={`${fieldProps.id}_option_item_${index}`}
                                value={value}
                                label={name}
                                control={<Radio {...radioProps} />}
                                {...rest}
                            />
                        )
                    })
                }
            </RadioGroup>
            {
                (fieldError || helperText) &&
                (
                    <FormHelperText>{fieldError || helperText}</FormHelperText>
                )
            }

        </FormControl>
    )
}