import * as React from 'react';
import { map, isString, get } from 'lodash';
import { FormikValues } from 'formik';
import { MenuItemProps } from '@material-ui/core';


export type MenuOptionObject = { name: string | React.ReactNode, value: string, menuItemProps?: MenuItemProps };
export type MenuOptions = Array<string> | Array<MenuOptionObject>;

export const getMenuOptions = (options: MenuOptions):Array<MenuOptionObject> => {
    return map(options, (item) => {
        if (isString(item))
            return { name: item, value: item };
        return item as MenuOptionObject;
    });
}

export const getFieldError = (fieldName: string, formikProps: FormikValues) => {
    const fieldError = get(formikProps, `errors.${fieldName}`);
    const isTouched = get(formikProps, `touched.${fieldName}`);
    if (!isTouched && formikProps.submitCount < 1)
        return '';
    return fieldError;
}

