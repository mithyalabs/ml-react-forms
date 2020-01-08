import { FC } from 'react';
import { DatePickerProps, TimePickerProps } from '@material-ui/pickers';
import { IFieldProps } from '../index';
export interface IMUIDatePickerProps extends DatePickerProps {
    outputFormat?: string;
}
export declare const MUIDatePicker: FC<IFieldProps & {
    fieldProps?: IMUIDatePickerProps;
}>;
export declare const MUITimePicker: FC<IFieldProps & {
    fieldProps?: TimePickerProps;
}>;
