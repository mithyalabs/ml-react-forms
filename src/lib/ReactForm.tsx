import React, { FC } from 'react';
import { MLFormBuilder, FormConfig, IFormActionProps } from './ml-form-builder';
import { Formik, FormikValues } from 'formik';
export * from './ml-form-builder';
export * from './ml-form-builder/lib';



/**
 * type1 - (text, password, email, number) will render text field with respective type, default text
 * type2 - select/multiselect - options([{key:val}] or [string])
 * type3 - checkbox/toggle - options([{key:val}] or [string])
 * type4 - radio/switch - options([{key:val}] or [string])
 * 
 */


/**
 * condition:{
 *  defaultState:'disable/hide',
 *  defaultProps:{},
 *  logicOpn 'AND|OR',
 *  postEffect:'enable',
 *  postEffectProps:{},
 *  valueFn:Function,
 *  values:[{
 *         key:'xyz',
 *         compareValue:'abc',
 *         operator:'==',         
 *    },{
 *         key:'abc',
 *         compareValue:4,
 *         operator:'>='
 *    }]
 * }
 */


export interface IReactFormProps extends FormikValues {
    config: Array<Array<FormConfig> | FormConfig>,
    formId: string,
    actionConfig: IFormActionProps
}
export const ReactForm: FC<IReactFormProps> = (props) => {
    const { config, formId, initialValues = {}, onSubmit, actionConfig, ...formikProps } = props;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            {...formikProps}
        >
            {
                formProps => (<MLFormBuilder schema={config} formId={formId} actionConfig={actionConfig} formikProps={formProps} />)
            }
        </Formik>

    )
}


export default ReactForm;