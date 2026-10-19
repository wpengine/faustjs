import * as React from 'react';
import { BlockConfiguration, BlockEditProps } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { Control, Field } from '../types/index.js';

const styles = {
	form: {
		padding: '0 10px',
		margin: '20px 0',
		border: '1px solid black',
	} as React.CSSProperties,
	icon: {
		marginRight: '10px',
	} as React.CSSProperties,
	heading: {
		margin: '10px 0',
		display: 'flex',
		alignItems: 'center',
	} as React.CSSProperties,
};

interface EditorFormProps<T extends Record<string, any>> {
	fields: Field[];
	props: BlockEditProps<T>;
	blockJson: BlockConfiguration;
}

function EditorForm<T extends Record<string, any>>({
	fields,
	props,
	blockJson,
}: EditorFormProps<T>) {
	const loadedControls = applyFilters('faustBlockEditorUtils.controls', {}) as {
		[key: string]: Control;
	};
	return (
		<div
			className="faust-editor-form"
			aria-label="Faust block editor form"
			style={styles.form}>
			<h3 className="faust-editor-form__heading" style={styles.heading}>
				<Icon
					size={24}
					// Newer @wordpress/blocks types widen `icon` to include the
					// { src, background, foreground } form; pass it through as before.
					icon={blockJson?.icon as React.ComponentProps<typeof Icon>['icon']}
					style={styles.icon}
				/>
				{blockJson.title}
			</h3>
			{fields.map((field: Field) => {
				const ControlField = loadedControls[field.control];
				if (!ControlField) {
					return null;
				}
				return (
					<ControlField
						config={field}
						props={props}
						key={`editor-field-${field.name}`}
					/>
				);
			})}
		</div>
	);
}

export default EditorForm;
