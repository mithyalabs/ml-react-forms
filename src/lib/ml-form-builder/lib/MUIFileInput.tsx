import * as React from 'react';

interface IMUIFileInput {
	multiple?: boolean
	accept?: string
	hasTooltip?: boolean
	invisible?: boolean
}

export const MUIFileInput: React.FC<IMUIFileInput> = (props: IMUIFileInput) => {
	const { multiple, accept, hasTooltip, invisible } = props

	return (
		<input type="file"
			multiple={multiple}
			style={invisible ? { opacity: 0, width: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } : {}}
			title={hasTooltip ? " " : undefined}
			accept={accept}
		/>
	)
}
