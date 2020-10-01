import React from 'react';
import { IFieldProps } from '../../ReactForm';
export interface IMUIFileInputProps {
    name?: string;
    readAs?: keyof Pick<FileReader, 'readAsBinaryString' | 'readAsDataURL'>;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    disableDefaultTooltip?: boolean;
    invisible?: boolean;
    onChange?: (files: FileList) => void;
    onDone?: (files: TFile[], remFiles?: TFile[]) => void;
    WrapWith?: (input: JSX.Element) => JSX.Element;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUIFileInputProps;
}
export interface TFile {
    name: string;
    type: string;
    size: string | number;
    base64?: string | ArrayBuffer | null;
    file: File;
}
export declare const MUIFileInput: React.FC<IProps>;
