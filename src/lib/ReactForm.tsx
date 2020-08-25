import * as React from 'react';
import { MLFormBuilder, RowSchema, IFormActionProps, BuilderSettingsProps } from './ml-form-builder';
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
    config: Array<RowSchema>,
    formId: string,
    actionConfig: IFormActionProps
    formSettings?: BuilderSettingsProps
    isInProgress?: boolean
    isReadOnly?: boolean
}
export const ReactForm: React.FC<IReactFormProps> = (props) => {
    const { config, formId, initialValues = {}, onSubmit, actionConfig, formSettings, isInProgress = false, isReadOnly = false, ...formikProps } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            {...formikProps}
        >
            {
                formProps => (<MLFormBuilder
                    schema={config}
                    formId={formId}
                    actionConfig={actionConfig}
                    settings={{ ...formSettings, isReadOnly }}
                    formikProps={formProps}
                    isInProgress={isInProgress}
                />)
            }
        </Formik>

    )
}


export default ReactForm;