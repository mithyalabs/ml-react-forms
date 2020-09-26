import * as React from 'react';

interface IMUIFileInput {
	multiple?: boolean
	accept?: string
	disableDefaultTooltip?: boolean
	invisible?: boolean
}

export const MUIFileInput: React.FC<IMUIFileInput> = (props: IMUIFileInput) => {
	const { multiple, accept, disableDefaultTooltip, invisible } = props

	return (
		<input type="file"
			multiple={multiple}
			style={invisible ? { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } : {}}
			title={disableDefaultTooltip ? " " : undefined}
			accept={accept}
		/>
	)
}
