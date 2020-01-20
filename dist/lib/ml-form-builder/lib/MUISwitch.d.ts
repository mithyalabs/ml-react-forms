import { FC } from 'react';
import { IFieldProps } from '../index';
import { SwitchProps } from '@material-ui/core';
export interface IMUISwitchProps extends SwitchProps {
    label?: string;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUISwitchProps;
}
export declare const MUISwitch: FC<IProps>;
