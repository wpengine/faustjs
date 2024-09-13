/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ToolbarSubmenu } from '../../../src/components/Toolbar';

test('renders the component correctly', () => {
  render(<ToolbarSubmenu id="1" />);
  const aElement = screen.getByRole('list');
  expect(aElement).toBeInTheDocument();
});
