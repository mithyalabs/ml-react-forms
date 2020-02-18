import * as React from 'react';
import { FormikValues } from 'formik';
export declare type MenuOptionObject = {
    name: string | React.ReactNode;
    value: string;
};
export declare type MenuOptions = Array<string> | Array<MenuOptionObject>;
export declare const getMenuOptions: (options: MenuOptions) => (number | MenuOptionObject | ((...items: string[]) => number) | ((...items: MenuOptionObject[]) => number) | {
    (...items: ConcatArray<string>[]): string[];
    (...items: (string | ConcatArray<string>)[]): string[];
} | {
    (...items: ConcatArray<MenuOptionObject>[]): MenuOptionObject[];
    (...items: (MenuOptionObject | ConcatArray<MenuOptionObject>)[]): MenuOptionObject[];
} | ((searchElement: string, fromIndex?: number | undefined) => number) | ((searchElement: MenuOptionObject, fromIndex?: number | undefined) => number) | ((callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any) => void) | ((callbackfn: (value: MenuOptionObject, index: number, array: MenuOptionObject[]) => void, thisArg?: any) => void) | {
    (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
    (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
    <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
} | {
    (callbackfn: (previousValue: MenuOptionObject, currentValue: MenuOptionObject, currentIndex: number, array: MenuOptionObject[]) => MenuOptionObject): MenuOptionObject;
    (callbackfn: (previousValue: MenuOptionObject, currentValue: MenuOptionObject, currentIndex: number, array: MenuOptionObject[]) => MenuOptionObject, initialValue: MenuOptionObject): MenuOptionObject;
    <U_1>(callbackfn: (previousValue: U_1, currentValue: MenuOptionObject, currentIndex: number, array: MenuOptionObject[]) => U_1, initialValue: U_1): U_1;
} | ((value: string, start?: number | undefined, end?: number | undefined) => string[]) | ((value: MenuOptionObject, start?: number | undefined, end?: number | undefined) => MenuOptionObject[]) | ((searchElement: string, fromIndex?: number | undefined) => boolean) | ((searchElement: MenuOptionObject, fromIndex?: number | undefined) => boolean))[];
export declare const getFieldError: (fieldName: string, formikProps: FormikValues) => any;
