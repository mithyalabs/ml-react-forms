import * as React from 'react';
import { map, isArray, uniqueId, get, isFunction } from 'lodash';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormikValues } from 'formik';
import { MUITextField, MUISelectField, MUICheckBox, MUISwitch, MUIRadio, MUIPlaceSuggest, MUIAutocomplete, MUIFieldArray, MUIDropDownTimePicker, MUIFileInput } from './lib';
import { MUIDatePicker, MUITimePicker } from './lib/MUIDateTimePicker';
import { getConditionalProps, TFieldConditions } from './lib/ConditionalOperation';


const { useEffect, useState } = React;

export interface ReadOnlyProps {
    renderer: (props: IFieldProps) => React.ReactNode
}
export interface FormConfig {
    type: string
    name?: string
    id?: string,
    valueKey: string
    flex?: number | string
    fieldProps?: object
    styles?: object
    classNames?: Array<string>,
    condition?: TFieldConditions
    readOnlyProps?: ReadOnlyProps
}

interface RowSettingsProps {
    horizontalSpacing?: number
    verticalSpacing?: number
    columnHorizontalPadding?: number
}
export interface BuilderSettingsProps extends RowSettingsProps {
    isReadOnly?: boolean
}

export type RowSchema = Array<FormConfig> | FormConfig | { columns: Array<FormConfig>, settings?: RowSettingsProps };
export interface FormRowProps {
    schema: RowSchema
    rowId: string
    formikProps?: FormikValues,
    settings?: BuilderSettingsProps
}



type submitButtonLayout = "right" | "center" | "fullWidth";
export interface IFormActionProps {
    submitButtonText?: string,
    submitButtonProps?: ButtonProps
    submitButtonLayout?: submitButtonLayout,
    actionContent?: JSX.Element,
    containerClassNames?: string | string[],
    displayActions?: boolean
    loaderProps?: CircularProgressProps
}
export interface BuilderProps {
    schema: Array<RowSchema>
    formId: string
    formikProps?: FormikValues,
    actionConfig?: IFormActionProps
    settings?: BuilderSettingsProps
    isInProgress?: boolean
}

export interface IFieldProps {
    formikProps?: FormikValues,
    fieldConfig?: FormConfig
    isReadOnly?: boolean
}

let ComponentMapConfig: { [key: string]: { component: JSX.Element, props?: object } } = {};

export const getComponentConfig = (type: string) => {
    return ComponentMapConfig[type];
}

export const attachField = (type: Array<string> | string, component: JSX.Element, props?: object) => {
    if (isArray(type)) {
        map(type, item => ComponentMapConfig[item] = { component, props })
    } else
        ComponentMapConfig[type] = { component, props };

}
export const setDefaultProps = (type: Array<string> | string, props: object) => {
    if (isArray(type)) {
        map(type, item => ComponentMapConfig[item].props = { ...ComponentMapConfig[item].props, ...props })
    } else
        ComponentMapConfig[type].props = { ...ComponentMapConfig[type].props, ...props }
}


attachField('text', <MUITextField />, { type: 'text' });
attachField('password', <MUITextField />, { type: 'password' });
attachField('select', <MUISelectField />);
attachField('checkbox', <MUICheckBox />);
attachField('date-picker', <MUIDatePicker />, { variant: 'inline', label: 'Select Date' });
attachField('time-picker', <MUITimePicker />, { variant: 'inline', label: 'Select Time' });
attachField('location-suggest', <MUIPlaceSuggest />);
attachField('switch', <MUISwitch />);
attachField('radio', <MUIRadio />);
attachField('autocomplete', < MUIAutocomplete />);
attachField('array', <MUIFieldArray />);
attachField('time-picker-select', <MUIDropDownTimePicker />)
attachField('file', <MUIFileInput />)


export const BuildFormRow: React.FC<FormRowProps> = props => {
    const { schema, rowId, formikProps = {}, settings = { horizontalSpacing: 10, verticalSpacing: 10, columnHorizontalPadding: 0, isReadOnly: false } } = props;
    let columnItems = get(schema, 'columns') as Array<FormConfig>;
    let rowSettings = { ...settings, ...get(schema, 'settings') } as RowSettingsProps;
    const colItems = (isArray(schema) ? schema : ((isArray(columnItems) ? columnItems : [schema])));
    const classes = useFormStyles();
    const rowStyle = { marginBottom: (rowSettings.verticalSpacing || 10) };
    return (
        <div className={classes.row} style={rowStyle}>
            {
                map(colItems, (item: FormConfig, index) => {
                    const componentConfig = ComponentMapConfig[item.type];
                    const horizontalSpacing = (index === (colItems.length - 1)) ? 0 : (rowSettings.horizontalSpacing || 10);
                    if (!componentConfig)
                        return <div key={`${rowId}_field_${index}`} />;

                    const conditionalProps = getConditionalProps(item, formikProps);
                    const fieldProps = { id: item.id, name: (item.name || item.valueKey), ...componentConfig.props, ...item.fieldProps, ...conditionalProps.finalProps };
                    const Component = componentConfig.component;

                    if (conditionalProps.hidden === true)
                        return <div key={`${rowId}_field_${index}`} />;
                    return (
                        <div key={`${rowId}_field_${index}`} className={clsx(item.classNames, classes.column)} style={
                            {
                                flex: (item.flex || 1),
                                marginRight: horizontalSpacing,
                                paddingLeft: rowSettings.columnHorizontalPadding,
                                paddingRight: rowSettings.columnHorizontalPadding,
                                ...item.styles

                            }
                        }>
                            {
                                (settings.isReadOnly && item.readOnlyProps && isFunction(item.readOnlyProps.renderer)) ?
                                    (item.readOnlyProps.renderer({ formikProps, fieldConfig: item, isReadOnly: settings.isReadOnly })) :
                                    React.cloneElement(Component, { fieldProps, formikProps, fieldConfig: item, isReadOnly: settings.isReadOnly })
                            }
                        </div>
                    )

                })
            }
        </div>
    )
}

const getUpdateSchema = (schema: Array<RowSchema>, formId: string) => {
    return map(schema, schemaItem => {
        if (isArray(schemaItem)) {
            return map(schemaItem, item => ({ ...item, id: `${formId}_${uniqueId()}` }));
        }
        return { ...schemaItem, id: `${formId}_${uniqueId()}` };
    });
}

export const MLFormContent: React.FC<BuilderProps> = props => {
    const { schema, formId, formikProps, settings } = props;
    const [formSchema, setFormSchema] = useState<Array<RowSchema>>(schema);
    useEffect(() => {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema])
    return (
        <>
            {
                map(formSchema, (configRow, index) => {
                    const rowId = `${formId}_row_${index}`;
                    return (<BuildFormRow key={rowId} rowId={rowId} schema={configRow} formikProps={formikProps} settings={settings} />);
                })
            }
        </>
    )
}

export const MLFormAction: React.FC<IFormActionProps & Pick<BuilderProps, 'formId' | 'formikProps'>> = (props) => {
    const { formId, formikProps = {} as FormikValues, containerClassNames, submitButtonLayout = 'center', submitButtonText = "Submit", submitButtonProps, loaderProps } = props;
    const classes = useFormStyles();
    if (props.actionContent)
        return (React.cloneElement(props.actionContent || <div />, { formikProps }));
    const layoutClassName = `action-${submitButtonLayout}`;
    return (
        <div className={clsx(classes.actionContainer, layoutClassName, containerClassNames)}>
            {
                (props.actionContent) ?
                    (React.cloneElement(props.actionContent || <div />, { formikProps, formId }))
                    : (
                        <>
                            <Button type="submit" disabled={formikProps.isSubmitting} variant="contained" color="primary" {...submitButtonProps}>{submitButtonText}</Button>
                            {
                                (formikProps.isSubmitting) && (<CircularProgress size={24} color="secondary" className={classes.submitLoader} {...loaderProps} />)
                            }
                        </>
                    )
            }

        </div>
    )
}

export const MLFormBuilder: React.FC<BuilderProps> = props => {
    const { formikProps = {} as FormikValues, isInProgress = false, actionConfig = {} as IFormActionProps } = props;
    useEffect(() => {
        if (isInProgress === false)
            formikProps.setSubmitting(false);
    }, [isInProgress]);

    return (
        <form onSubmit={formikProps.handleSubmit}>
            <MLFormContent {...props} />
            {
                (actionConfig.displayActions !== false) &&
                (<MLFormAction formId={props.formId} formikProps={formikProps} {...actionConfig} />)
            }

        </form>
    )
}


const useFormStyles = makeStyles<Theme>(() => {
    return (createStyles({
        row: {
            display: 'flex'
        },
        column: {},
        actionContainer: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            '&.action-center': {
                justifyContent: 'center'
            },
            '&.action-right': {
                justifyContent: 'flex-end'
            },
            '&.action-fullWidth > button': {
                flex: 1
            }
        },
        submitLoader: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            marginTop: -5
        }
    }))
})

export default MLFormBuilder;
