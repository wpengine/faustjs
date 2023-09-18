import React from 'react';
import { screen, render } from '@testing-library/react';
import NumberField from '../../src/controls/Number';
import { Field } from '../../src/types';

const config: Field = {
  label: 'numberField',
  name: 'numberField',
  type: 'number',
  control: 'number',
  location: 'inspector',
};
const props = {
  setAttributes: jest.fn(),
  attributes: {
    numberField: 634571,
  },
};

const setup = () => {
  const utils = render(<NumberField config={config} props={props} />);
  const input = screen.findAllByDisplayValue(props.attributes.numberField!);
  return {
    input,
    ...utils,
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('NumberField', () => {
  it('should mount', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('should have correct display value from props', () => {
    setup();
    expect(screen.getByDisplayValue(props.attributes.numberField)).toBeTruthy();
  });
});
