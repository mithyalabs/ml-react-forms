import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import _ from 'lodash';
import { FormikValues } from 'formik';
import { IFieldProps } from '../../ReactForm';



export interface IMUIFileInputProps {
	name?: string
	readAs?: keyof Pick<FileReader, 'readAsBinaryString' | 'readAsDataURL'>
	disabled?: boolean
	multiple?: boolean
	accept?: string
	disableDefaultTooltip?: boolean
	invisible?: boolean
	onChange?: (files: FileList) => void
	onDone?: (files: TFile[], remFiles?: TFile[]) => void
	/* File for when multiple is false and File[] for when multiple is true */
	WrapWith?: (input: JSX.Element) => JSX.Element
	/* Function passed to WrapWith should take the input Element and return the same within the wrapped element.
	The input element is always invisible if WrapWith is provided*/
}

export interface IProps extends IFieldProps {
	fieldProps?: IMUIFileInputProps
}

export interface TFile {
	name: string,
	type: string,
	size: string | number,
	base64?: string | ArrayBuffer | null,
	file: File
}

export const MUIFileInput: React.FC<IProps> = (props) => {
	const { formikProps = {} as FormikValues, fieldProps = {} as IMUIFileInputProps } = props;
	const {
		onDone,
		multiple,
		invisible,
		disableDefaultTooltip,
		accept,
		readAs,
		disabled,
		onChange,
		WrapWith,
	} = fieldProps
	const setValue = (files: any) => {
		if (typeof formikProps.setFieldValue === "function") {
			formikProps.setFieldValue(_.get(fieldProps, 'name'), files)
		}
	}
	const classes = useStyles();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// e.persist()
		// onChange?.(e)
		let files = e.target.files || new FileList()
		if (onChange) {
			onChange(files);
			setValue(files)
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
						setValue(allFiles.concat(remFiles))
					}
				}
				reader[readAs || 'readAsDataURL'](file);
			} else {
				remFiles.push(file);
				if ((allFiles.length + remFiles.length) === files.length) {
					onDone?.(allFiles, remFiles);
					setValue(allFiles.concat(remFiles))
				}
			}
		});
	}
	return (<>
		{
			WrapWith ? WrapWith(<input type="file" disabled={disabled}
				multiple={multiple}
				className={classes.invisibleInput}
				title={disableDefaultTooltip ? " " : undefined}
				accept={accept}
				onChange={handleChange}
			/>) : <input type="file" disabled={disabled}
				multiple={multiple}
				className={invisible ? classes.invisibleInput : ""}
				title={disableDefaultTooltip ? " " : undefined}
				accept={accept}
				onChange={handleChange}
				/>
		}</>

	)
}

const useStyles = makeStyles<Theme>(() => createStyles({
	invisibleInput: { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer' }
}))
