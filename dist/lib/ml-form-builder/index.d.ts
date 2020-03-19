import * as React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { FormikValues } from 'formik';
import { TFieldConditions } from './lib/ConditionalOperation';
export interface FormConfig {
    type: string;
    name?: string;
    id?: string;
    valueKey: string;
    flex?: number | string;
    fieldProps?: object;
    styles?: object;
    classNames?: Array<string>;
    condition?: TFieldConditions;
}
interface RowSettingsProps {
    horiontalSpacing?: number;
    verticalSpacing?: number;
    columnHorizontalPadding?: number;
}
export interface BuilderSettingsProps extends RowSettingsProps {
}
export declare type RowSchema = Array<FormConfig> | FormConfig | {
    columns: Array<FormConfig>;
    settings?: RowSettingsProps;
};
export interface FormRowProps {
    schema: RowSchema;
    rowId: string;
    formikProps?: FormikValues;
    settings?: BuilderSettingsProps;
}
declare type submitButtonLayout = "right" | "center" | "fullwidth";
export interface IFormActionProps {
    submitButtonText?: string;
    submitButtonProps?: ButtonProps;
    submitButtonLayout?: submitButtonLayout;
    actionContent?: JSX.Element;
    containerClassNames?: string | string[];
    displayActions?: boolean;
    loaderProps?: CircularProgressProps;
}
export interface BuilderProps {
    schema: Array<RowSchema>;
    formId: string;
    formikProps?: FormikValues;
    actionConfig?: IFormActionProps;
    settings?: BuilderSettingsProps;
    isInProgress?: boolean;
}
export interface IFieldProps {
    formikProps?: FormikValues;
    fieldConfig?: FormConfig;
}
export declare const getComponentConfig: (type: string) => {
    component: JSX.Element;
    props?: object | undefined;
};
export declare const attachField: (type: string | string[], component: JSX.Element, props?: object | undefined) => void;
export declare const setDefaultProps: (type: string | string[], props: object) => void;
export declare const BuildFormRow: React.FC<FormRowProps>;
export declare const MLFormContent: React.FC<BuilderProps>;
export declare const MLFormAction: React.FC<IFormActionProps & Pick<BuilderProps, 'formId' | 'formikProps'>>;
export declare const MLFormBuilder: React.FC<BuilderProps>;
export default MLFormBuilder;
