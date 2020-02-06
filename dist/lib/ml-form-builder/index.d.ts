import { FC } from 'react';
import { ButtonProps } from '@material-ui/core/Button';
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
}
export interface BuilderProps {
    schema: Array<RowSchema>;
    formId: string;
    formikProps?: FormikValues;
    actionConfig?: IFormActionProps;
    settings?: BuilderSettingsProps;
}
export interface IFieldProps {
    formikProps?: FormikValues;
    fieldConfig?: FormConfig;
}
export declare const attachField: (type: string | string[], component: JSX.Element, props?: object | undefined) => void;
export declare const BuildFormRow: FC<FormRowProps>;
export declare const MLFormContent: FC<BuilderProps>;
export declare const MLFormAction: FC<IFormActionProps & Pick<BuilderProps, 'formId' | 'formikProps'>>;
export declare const MLFormBuilder: FC<BuilderProps>;
export default MLFormBuilder;
