import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import _ from 'lodash';

interface MUIFileInputProps {
	disabled?: boolean
	multiple?: boolean
	accept?: string
	disableDefaultTooltip?: boolean
	invisible?: boolean
	onChange?: ((data: IFile[] | IFile) => void)
	/* IFile for when multiple is false and IFile[] for when multiple is true */
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
	const { multiple, accept, disableDefaultTooltip, invisible, disabled, onChange, inputProps = {} } = props
	const classes = useStyles();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files
		if (selectedFiles) {
			let allFiles: IFile[] = [];
			_.each(selectedFiles, (file: any) => {
				let reader = new FileReader();
				reader.onload = () => {
					let fileInfo = {
						name: file.name,
						type: file.type,
						size: Math.round(file.size / 1000) + ' kB',
						base64: reader.result,
						file: file,
					};
					allFiles.push(fileInfo);
					if (allFiles.length === (selectedFiles && selectedFiles.length)) {
						if (multiple)
							onChange?.(allFiles[0])
						else
							onChange?.(allFiles)
					}
				}
				reader.readAsDataURL(file);
			});

		}
	}
	return (
		<input type="file" disabled={disabled}
			multiple={multiple}
			className={invisible ? classes.invisibleInput : ""}
			title={disableDefaultTooltip ? " " : undefined}
			accept={accept}
			onChange={handleChange}
			{...inputProps}
		/>
	)
}

const useStyles = makeStyles<Theme>(() => createStyles({
	invisibleInput: { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer' }
}))