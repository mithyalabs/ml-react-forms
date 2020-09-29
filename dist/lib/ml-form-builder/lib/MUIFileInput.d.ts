import React from 'react';
export interface MUIFileInputProps {
    readAs?: string;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
    disableDefaultTooltip?: boolean;
    invisible?: boolean;
    onChange?: ((files: FileList) => void);
    onDone?: (files: TFile[], remFiles: TFile[]) => void;
    inputProps?: any;
}
export interface TFile {
    name: string;
    type: string;
    size: string | number;
    base64?: string | ArrayBuffer | null;
    file: File;
}
export declare const MUIFileInput: React.FC<MUIFileInputProps>;
