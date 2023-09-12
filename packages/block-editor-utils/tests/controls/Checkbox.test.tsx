import React from 'react';
import { screen, render } from '@testing-library/react';
import Checkbox from '../../src/controls/Checkbox';
import { Field } from '../../src/types';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
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
  location: "inspector",
  control: "checkbox",
  label: 'checkboxField', 
  default: "false",
  help: "here is help",
  name: "checkboxField",
  type: "boolean"
};

// This should set the checkbox value (aka check the box)
const props = {
  setAttributes: jest.fn(),
  attributes: {
    checkboxField: "1",
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

  it('should have correct display value from props', () => {
    setup();
    expect(screen.getByDisplayValue(props.attributes.checkboxField)).toBeTruthy();
  });
});