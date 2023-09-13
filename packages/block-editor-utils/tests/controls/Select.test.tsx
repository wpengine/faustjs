import React from 'react';
import { screen, render } from '@testing-library/react';
import Select from '../../src/controls/Select';
import { Field } from '../../src/types';

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
  label: 'selectField',
  name: 'selectField',
  type: 'string',
  control: 'radio',
  location: 'inspector',
  options: [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
  ],
};
const props = {
  setAttributes: jest.fn(),
  attributes: {
    selectField: 'Red',
  },
};

const setup = () => {
  const utils = render(<Select config={config} props={props} />);
  const input = screen.findAllByDisplayValue(props.attributes.selectField!);
  return {
    input,
    ...utils,
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Select', () => {
  it('should mount', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('should have correct display value from props', () => {
    setup();
    expect(screen.getByDisplayValue(props.attributes.selectField)).toBeTruthy();
  });
});
