import React from 'react';
interface MUIFileInputProps {
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    disableDefaultTooltip?: boolean;
    invisible?: boolean;
    readAs?: keyof Pick<FileReader, 'readAsDataURL' | 'readAsBinaryString'>;
    onChange?: (data: File | File[]) => void;
    inputProps?: any;
}
export interface IFile {
    name: string;
    type: string;
    size: number | string;
    base64: string | ArrayBuffer | null;
    file: any;
}
export declare const MUIFileInput: React.FC<MUIFileInputProps>;
export {};
