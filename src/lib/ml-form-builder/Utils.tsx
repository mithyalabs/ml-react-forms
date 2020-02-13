import React from 'react';
import { map, isString,get } from 'lodash';
import {FormikValues} from 'formik';


export type MenuOptionObject = { name: string|React.ReactNode, value: string };
export type MenuOptions = Array<string> | Array<MenuOptionObject>;

export const getMenuOptions = (options: MenuOptions) => {
    return map(options, (item) => {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
}

export const getFieldError = (fieldName:string,formikProps:FormikValues) => {
    const fieldError = get(formikProps, `errors.${fieldName}`);
    const isTouched = get(formikProps,`touched.${fieldName}`);
    if(!isTouched)
        return '';
    return fieldError;
}

