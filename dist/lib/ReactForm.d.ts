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
export interface IReactFormProps extends FormikValues {
    config: Array<Array<FormConfig> | FormConfig>;
    formId: string;
}
export declare const ReactForm: FC<IReactFormProps>;
export default ReactForm;
