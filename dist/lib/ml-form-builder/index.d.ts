import { FC } from 'react';
import { FormikValues } from 'formik';
export interface FormConfig {
    type: string;
    name?: string;
    id?: string;
    valueKey: string;
    flex?: number | string;
    fieldProps?: object;
    styles?: object;
    classNames?: Array<string>;
}
export interface FormRowProps {
    schema: Array<FormConfig> | FormConfig;
    rowId: string;
    formikProps?: FormikValues;
}
export interface BuilderProps {
    schema: Array<Array<FormConfig> | FormConfig>;
    formId: string;
    formikProps?: FormikValues;
}
export interface IFieldProps {
    formikProps?: FormikValues;
    fieldConfig?: FormConfig;
}
export declare const attachField: (type: string | string[], component: JSX.Element, props?: object | undefined) => void;
export declare const BuildFormRow: FC<FormRowProps>;
export declare const MLFormContent: FC<BuilderProps>;
export declare const MLFormBuilder: FC<BuilderProps>;
export default MLFormBuilder;
