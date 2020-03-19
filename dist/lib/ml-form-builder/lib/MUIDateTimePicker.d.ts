import * as React from 'react';
import { KeyboardDatePickerProps, TimePickerProps } from '@material-ui/pickers';
import { IFieldProps } from '..';
export interface IMUIDatePickerProps extends KeyboardDatePickerProps {
    outputFormat?: string;
}
export declare const MUIDatePicker: React.FC<IFieldProps & {
    fieldProps?: IMUIDatePickerProps;
}>;
export declare const MUITimePicker: React.FC<IFieldProps & {
    fieldProps?: TimePickerProps;
}>;
