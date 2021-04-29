import * as React from 'react';
import { FormikValues } from 'formik';
import { MenuItemProps } from '@material-ui/core';
export declare type MenuOptionObject = {
    name: string | React.ReactNode;
    value: string;
    menuItemProps?: MenuItemProps;
};
export declare type MenuOptions = Array<string> | Array<MenuOptionObject>;
export declare const getMenuOptions: (options: MenuOptions) => MenuOptionObject[];
export declare const getFieldError: (fieldName: string, formikProps: FormikValues) => any;
