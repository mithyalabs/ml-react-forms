import * as React from 'react';
import { IFieldProps } from '../index';
export interface IProps extends IFieldProps {
    label: React.ReactNode;
    value: React.ReactNode;
}
export declare const MUIReadOnly: React.FC<IProps>;
export default MUIReadOnly;
