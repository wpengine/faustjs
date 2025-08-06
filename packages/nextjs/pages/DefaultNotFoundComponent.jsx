/**
 * @file Default error component for when templates are not found
 */

import React from 'react';

/**
 * Default error component for when templates are not found
 */
export function DefaultNotFoundComponent({ templateData, error }) {
	return (
		<div style={{ padding: '20px', textAlign: 'center' }}>
			<h1 style={{ color: 'red' }}>
				{error === 'template' ? 'Template not found' : 'Component not found'}
			</h1>
			{error === 'template' ? (
				<p>No template could be resolved for this URI.</p>
			) : (
				<>
					<p>Template "{templateData?.template?.id}" is not available.</p>
					<pre
						style={{
							textAlign: 'left',
							background: '#f5f5f5',
							padding: '10px',
							fontSize: '12px',
							overflow: 'auto',
						}}>
						{JSON.stringify(templateData, null, 2)}
					</pre>
				</>
			)}
		</div>
	);
}
