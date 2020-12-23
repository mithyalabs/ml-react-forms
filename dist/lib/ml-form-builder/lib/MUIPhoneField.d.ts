import { BoxProps, FormControlProps, SelectProps, TextFieldProps } from "@material-ui/core";
import { FC } from "react";
import { IFieldProps } from "..";
export interface IMUIPhoneFieldProps {
    name?: string;
    countryCodeProps?: SelectProps;
    countryCodeLabel?: string;
    countryCodeFormControlProps?: FormControlProps;
    phoneNumberProps?: TextFieldProps;
    phoneLabel?: string;
    countryCodeContainerProps: BoxProps;
    phoneContainerProps: BoxProps;
}
export interface MUIPhoneFieldProps extends IFieldProps {
    fieldProps?: IMUIPhoneFieldProps;
}
export declare const MUIPhoneField: FC<MUIPhoneFieldProps>;
export default MUIPhoneField;
