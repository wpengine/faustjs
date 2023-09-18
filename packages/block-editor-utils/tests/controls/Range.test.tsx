import React from 'react';
import { screen, render } from '@testing-library/react';
import Range from '../../src/controls/Range';
import { Field } from '../../src/types';

const config: Field = {
  label: 'rangeField',
  name: 'rangeField',
  type: 'number',
  control: 'range',
  location: 'inspector',
  min: 0,
  max: 50,
};
const props = {
  setAttributes: jest.fn(),
  attributes: {
    rangeField: 20,
  },
};

const setup = () => {
  const utils = render(<Range config={config} props={props} />);
  const input = screen.findAllByDisplayValue(props.attributes.rangeField!);
  return {
    input,
    ...utils,
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('RangeField', () => {
  it('should mount', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('should have correct display value from props', () => {
    setup();
    expect(
      screen.getByRole('spinbutton', {
        name: /rangefield/i,
      })
    ).toHaveValue(props.attributes.rangeField);
  });
});
