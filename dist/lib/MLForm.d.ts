import { FC } from 'react';
import { FormConfig } from './ml-form-builder';
import { FormikValues } from 'formik';
export * from './ml-form-builder';
/**
 * type1 - (text, password, email, number) will render text field with respective type, default text
 * type2 - select/multiselect - options([{key:val}] or [string])
 * type3 - checkbox/toggle - options([{key:val}] or [string])
 * type4 - radio/switch - options([{key:val}] or [string])
 */
export interface IMLFormProps extends FormikValues {
    config: Array<Array<FormConfig> | FormConfig>;
    formId: string;
}
export declare const MLForm: FC<IMLFormProps>;
export default MLForm;
