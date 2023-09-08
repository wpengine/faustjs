import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { TextControl as NumberControl } from '@wordpress/components';

const onChange = jest.fn();
const value = 0;
const label = 'numberField';

const setup = () => {
  const utils = render(
    <NumberControl label={label} value={value} onChange={onChange} />,
  );
  const input = screen.getByDisplayValue(value);
  return {
    input,
    ...utils,
  };
};

it('It should mount', () => {
  const { input } = setup();
  expect(input).toBeTruthy();
});

// xit('It should allow a $ to be in the input when the value is changed', () => {
//   const { input } = setup();
//   fireEvent.change(input, { target: { value: '$23.0' } });
//   expect(input.label).toBe(label);
// });

// xit('It should not allow letters to be inputted', () => {
//   const { input } = setup();
//   expect(input.value).toBe(''); // empty before
//   fireEvent.change(input, { target: { value: 'Good Day' } });
//   expect(input.value).toBe(''); //empty after
// });

// xit('It should allow the $ to be deleted', () => {
//   const { input } = setup();
//   fireEvent.change(input, { target: { value: '23' } });
//   expect(input.value).toBe('$23'); // need to make a change so React registers "" as a change
//   fireEvent.change(input, { target: { value: '' } });
//   expect(input.value).toBe('');
// });
