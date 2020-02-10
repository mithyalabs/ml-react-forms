import { FC } from 'react';
import { KeyboardDatePickerProps, TimePickerProps } from '@material-ui/pickers';
import { IFieldProps } from '../index';
export interface IMUIDatePickerProps extends KeyboardDatePickerProps {
    outputFormat?: string;
}
export declare const MUIDatePicker: FC<IFieldProps & {
    fieldProps?: IMUIDatePickerProps;
}>;
export declare const MUITimePicker: FC<IFieldProps & {
    fieldProps?: TimePickerProps;
}>;
