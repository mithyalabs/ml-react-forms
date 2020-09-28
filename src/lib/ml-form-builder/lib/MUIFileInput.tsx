import React from 'react';

interface MUIFileInputProps {
	disabled?: boolean
	multiple?: boolean
	accept?: string
	disableDefaultTooltip?: boolean
	invisible?: boolean
	readAs?: keyof Pick<FileReader, 'readAsDataURL' | 'readAsBinaryString'>;
	onChange?: (data: File | File[]) => void
	inputProps?: any
}

export interface IFile {
	name: string,
	type: string,
	size: number | string,
	base64: string | ArrayBuffer | null,
	file: any,
}

export const MUIFileInput: React.FC<MUIFileInputProps> = (props: MUIFileInputProps) => {
	const { multiple, accept, disableDefaultTooltip, invisible, disabled, onChange, inputProps } = props

	return (
		<input type="file" disabled={disabled}
			multiple={multiple}
			style={invisible ? { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer' } : {}}
			title={disableDefaultTooltip ? " " : undefined}
			accept={accept}
			onChange={onChange}
			{...inputProps}
		/>
	)
}
