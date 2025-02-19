/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ToolbarNode } from '../../../src/components/Toolbar';

xtest('renders the component correctly', () => {
	render(<ToolbarNode />);
	const liElement = screen.getByRole(/listitem/i);
	expect(liElement).toBeInTheDocument();
});
