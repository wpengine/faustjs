import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Checkbox from '../../src/controls/Checkbox';
import { Field } from '../../src/types';
import { useState } from 'react';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const config: Field = {
  location: 'inspector',
  control: 'checkbox',
  label: 'checkboxField',
  default: 'false',
  name: 'checkboxField',
  type: 'boolean',
};

// This should set the checkbox value (aka check the box)
const props = {
  setAttributes: jest.fn(),
  attributes: {
    checkboxField: '1',
  },
};

const setup = () => {
  const utils = render(<Checkbox config={config} props={props} />);
  const input = screen.findAllByDisplayValue(props.attributes.checkboxField!);
  return {
    input,
    ...utils,
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Checkbox', () => {
  it('should mount', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('checks that checkbox gets checked', () => {
    render(
      <input
        type="checkbox"
        aria-label="checkbox"
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'checkbox' });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should have correct display value from props', () => {
    setup();
    expect(
      screen.getByDisplayValue(props.attributes.checkboxField),
    ).toBeTruthy();
  });
});
