import { FormikValues } from "formik";
import { FormConfig } from "../..";
export declare type TFieldConditions = {
    hidden?: boolean;
    logicOpn?: string;
    defaultProps?: object;
    truthyProps?: object;
    values?: ConditionCompareItem[];
};
interface ConditionCompareItem {
    key: string;
    compareValue: string;
    operator: string;
}
export interface IConditionalProps {
    hidden?: boolean;
    finalProps?: object;
}
export declare const getConditionalProps: (itemConfig: FormConfig, formikProps: FormikValues) => {
    finalProps: object | undefined;
    hidden?: undefined;
} | {
    finalProps: object | undefined;
    hidden: boolean;
};
export {};
