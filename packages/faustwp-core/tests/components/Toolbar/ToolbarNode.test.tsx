/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ToolbarNode } from '../../../src/components/Toolbar';

test('renders the component correctly', () => {
  render(<ToolbarNode id="1" />);
  const aElement = screen.getByRole('listitem');
  expect(aElement).toBeInTheDocument();
});
