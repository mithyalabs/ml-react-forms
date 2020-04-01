import { FormControlProps, FormHelperTextProps, SelectProps } from '@material-ui/core';
import { FC } from 'react';
import { IFieldProps } from '..';
export interface IMUIDropDownTimePickerProps extends SelectProps {
    label?: string;
    emptyItem?: string | boolean;
    helperText?: string;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
    startTime?: string | Date;
    endTime?: string | Date;
    interval?: number;
    amPm?: boolean;
    emptyMenuItemProps?: object;
    menuItemProps?: object;
    inputLabelProps?: object;
}
export interface MUIDropDownTimePickerProps extends IFieldProps {
    fieldProps?: IMUIDropDownTimePickerProps;
}
export declare const MUIDropDownTimePicker: FC<MUIDropDownTimePickerProps>;
