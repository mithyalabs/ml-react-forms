import React, { FC } from 'react';
import { MLFormBuilder, FormConfig } from './ml-form-builder';
import { Formik, FormikValues } from 'formik';
export * from './ml-form-builder';



/**
 * type1 - (text, password, email, number) will render text field with respective type, default text
 * type2 - select/multiselect - options([{key:val}] or [string])
 * type3 - checkbox/toggle - options([{key:val}] or [string])
 * type4 - radio/switch - options([{key:val}] or [string])
 */


export interface IReactFormProps extends FormikValues {
    config: Array<Array<FormConfig> | FormConfig>,
    formId: string
}
export const ReactForm: FC<IReactFormProps> = (props) => {
    const { config, formId, initialValues = {}, onSubmit, ...formikProps } = props;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            {...formikProps}
        >
            {
                formProps => (<MLFormBuilder schema={config} formId={formId} formikProps={formProps} />)
            }
        </Formik>

    )
}


export default ReactForm;