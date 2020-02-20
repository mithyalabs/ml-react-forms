import { FormikValues } from "formik";

import { get, forEach, isEmpty } from "lodash";

import { FormConfig } from "../..";

export type TFieldConditions = {
    hidden?: boolean
    logicOpn?: string
    defaultProps?: object //Props to be returned if neccessary conditions are not satisfied
    truthyProps?: object //Props to be returned if and only if neccessary conditions are true
    values?: ConditionCompareItem[]
}
type compareValueType = string | number | boolean;
const compare = (value1: compareValueType, operator: string, value2: compareValueType) => {
    switch (operator) {
        case '>': return value1 > value2;
        case '<': return value1 < value2;
        case '>=': return value1 >= value2;
        case '<=': return value1 <= value2;
        case '==': return value1 == value2;
        case '!=': return value1 != value2;
        case '===': return value1 === value2;
        case '!==': return value1 !== value2;
        default: return false;
    }
}
interface ConditionCompareItem {
    key: string
    compareValue: string
    operator: string
}
export interface IConditionalProps {
    hidden?: boolean,
    finalProps?: object
}
const getConditionalOutput = (itemCondition: ConditionCompareItem, formikProps: FormikValues) => {
    const itemValue = get(formikProps, `values.${itemCondition.key}`);
    return compare(itemValue, itemCondition.operator, itemCondition.compareValue);
}



const hasTruthyValue = (logicalOperation = 'AND', values: Array<ConditionCompareItem>, formikProps: FormikValues): boolean => {
    let outputResult = false;

    forEach(values, (item: ConditionCompareItem, index: number) => {
        const result = getConditionalOutput(item, formikProps);
        if (logicalOperation === 'AND' && !result) {
            outputResult = false;
            return false;
        }
        if (logicalOperation === 'OR' && result) {
            outputResult = true;
            return false;
        }
        if (index === values.length - 1) {
            outputResult = (logicalOperation === 'AND') ? true : false;
        }
        return;
    });
    return outputResult;
}
export const getConditionalProps = (itemConfig: FormConfig, formikProps: FormikValues) => {
    const conditionInstructions = itemConfig.condition;
    if (!conditionInstructions || isEmpty(conditionInstructions.values)) {
        return { finalProps: {} };
    }
    const isValidCondition = hasTruthyValue(conditionInstructions.logicOpn, conditionInstructions.values || [], formikProps);

    //console.log('Conditional props valid condition', isValidCondition);


    if (isValidCondition) {
        /*
        IF CONDITION IS TRUE THEN RETURN THE TRUTHY PROPS ELSE RETURN THE DEFAULT PROPS
        */
        return { finalProps: conditionInstructions.truthyProps }
    }
    else {
        if (conditionInstructions.hidden === true)
            return { finalProps: conditionInstructions.defaultProps, hidden: true };
        else
            return { finalProps: conditionInstructions.defaultProps, }
    }
}