import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import _ from 'lodash';

export interface MUIFileInputProps {
	readAs?: string
	disabled?: boolean
	multiple?: boolean
	accept?: string
	disableDefaultTooltip?: boolean
	invisible?: boolean
	onChange?: ((files: FileList) => void)
	onDone?: (files: TFile[], remFiles: TFile[]) => void
	/* File for when multiple is false and File[] for when multiple is true */
	inputProps?: any
}

export interface TFile {
	name: string,
	type: string,
	size: string | number,
	base64?: string | ArrayBuffer | null,
	file: File
}

export const MUIFileInput: React.FC<MUIFileInputProps> = (props: MUIFileInputProps) => {
	const { multiple, accept, disableDefaultTooltip, invisible, disabled, onChange, inputProps = {}, onDone } = props
	const classes = useStyles();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files = e.target.files || new FileList()
		if (onChange) {
			onChange(files);
		}
		let allFiles: Array<TFile> = [];
		let remFiles: any[] = [];
		Array.from(files).forEach(file => {
			if (file.type.includes('image')) {
				let reader = new FileReader();
				reader.onload = () => {
					let fileInfo: TFile = {
						name: file.name,
						type: file.type,
						size: Math.round(file.size / 1000) + ' kB',
						base64: file.type.includes('image') ? reader.result : null,
						file: file,
					};
					allFiles.push(fileInfo);
					if ((allFiles.length + remFiles.length) === files.length) {
						onDone?.(allFiles, remFiles);
					}
				}

				reader[props.readAs || 'readAsDataURL'](file);
			} else {
				remFiles.push(file);
				if ((allFiles.length + remFiles.length) === files.length) {
					if (props.onDone)
						props.onDone(allFiles, remFiles);
				}
			}
		});
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