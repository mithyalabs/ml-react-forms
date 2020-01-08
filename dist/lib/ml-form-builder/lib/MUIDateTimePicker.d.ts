import { FC } from 'react';
import { DatePickerProps, TimePickerProps } from '@material-ui/pickers';
import { IFieldProps } from '../index';
export declare const MUIDatePicker: FC<IFieldProps & {
    fieldProps?: DatePickerProps;
}>;
export declare const MUITimePicker: FC<IFieldProps & {
    fieldProps?: TimePickerProps;
}>;
