import React, { FC, useEffect, useState } from 'react';
import { map, isArray, uniqueId } from 'lodash';
import { Button } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormikValues } from 'formik';
import { MUITextField } from './lib/MUITextField';
import { MUISelectField } from './lib/MUISelectField';
import { MUICheckBox } from './lib/MUICheckBox';

export interface FormConfig {
    type: string
    name?: string
    id?: string,
    valueKey: string
    flex?: number | string
    fieldProps?: object
    styles?: object
    classNames?: Array<string>
}
export interface FormRowProps {
    schema: Array<FormConfig> | FormConfig
    rowId: string
    formikProps?: FormikValues
}

export interface BuilderProps {
    schema: Array<Array<FormConfig> | FormConfig>
    formId: string
    formikProps?: FormikValues
}

export interface IFieldProps {
    formikProps?: FormikValues,
    fieldConfig?: FormConfig
}

let ComponentMapConfig: { [key: string]: { component: JSX.Element, props?: object } } = {};

export const attachField = (type: Array<string> | string, component: JSX.Element, props?: object) => {
    if (isArray(type)) {
        map(type, item => ComponentMapConfig[item] = { component, props })
    } else
        ComponentMapConfig[type] = { component, props };

}


attachField('text', <MUITextField />, { type: 'text' });
attachField('password', <MUITextField />, { type: 'password' });
attachField('select', <MUISelectField />);
attachField('checkbox', <MUICheckBox />);




export const BuildFormRow: FC<FormRowProps> = props => {
    const { schema, rowId, formikProps } = props;
    const colItems = (!isArray(schema) ? [schema] : schema);
    const classes = useFormStyles();
    return (
        <div className={classes.row}>
            {
                map(colItems, (item: FormConfig, index) => {
                    const componentConfig = ComponentMapConfig[item.type];
                    if (!componentConfig)
                        return <div key={`${rowId}_field_${index}`} />;


                    const fieldProps = { id: item.id, name: (item.name || item.valueKey), ...componentConfig.props, ...item.fieldProps };
                    const Component = componentConfig.component;
                    return (
                        <div key={`${rowId}_field_${index}`} className={clsx(item.classNames, classes.column)} style={{ flex: (item.flex || 1), ...item.styles }}>
                            {

                                React.cloneElement(Component, { fieldProps, formikProps, fieldConfig: item })
                            }
                        </div>
                    )

                })
            }
        </div>
    )
}

const getUpdateSchema = (schema: Array<Array<FormConfig> | FormConfig>, formId: string) => {
    return map(schema, schemaItem => {
        if (isArray(schemaItem)) {
            return map(schemaItem, item => ({ ...item, id: `${formId}_${uniqueId()}` }));
        }
        return { ...schemaItem, id: `${formId}_${uniqueId()}` };
    });
}

export const MLFormContent: FC<BuilderProps> = props => {
    const { schema, formId, formikProps } = props;
    const [formSchema, setFormSchema] = useState<Array<Array<FormConfig> | FormConfig>>(schema);
    useEffect(() => {
        setFormSchema(getUpdateSchema(schema, formId));
    }, [schema])
    return (
        <>
            {
                map(formSchema, (configRow, index) => {
                    const rowId = `${formId}_row_${index}`;
                    return (<BuildFormRow key={rowId} rowId={rowId} schema={configRow} formikProps={formikProps} />);
                })
            }
        </>
    )
}
export const MLFormBuilder: FC<BuilderProps> = props => {
    const { formikProps = {} as FormikValues } = props;
    return (
        <form onSubmit={formikProps.handleSubmit}>
            <MLFormContent {...props} />
            <Button type="submit">Submit</Button>
        </form>
    )
}


const useFormStyles = makeStyles<Theme>(() => {
    return (createStyles({
        row: {
            display: 'flex'
        },
        column: {}
    }))
})

export default MLFormBuilder;