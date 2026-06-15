import * as React from 'react';
import { TextareaControl } from '@wordpress/components';
import { ControlProps } from '../types/index.js';

function TextArea<T extends Record<string, any>>({
	config,
	props,
}: ControlProps<T>) {
	const onChange = (newContent: string) => {
		props.setAttributes({ [config.name]: newContent });
	};
	return (
		<TextareaControl
			label={config.label}
			value={props.attributes[config.name]}
			onChange={onChange}
		/>
	);
}

export default TextArea;
