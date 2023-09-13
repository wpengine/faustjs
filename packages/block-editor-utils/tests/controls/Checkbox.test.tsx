import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Checkbox from '../../src/controls/Checkbox';
import { Field } from '../../src/types';
import { useState } from 'react';
import '@testing-library/jest-dom'; 

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


// FireEvent for click
// fireEvent.change(getByLabelText(/username/i), {target: {value: 'a'}})

//fire event:
// const Button = ({onClick, children}) => (
//   <button onClick={onClick}>{children}</button>
// )

// test('calls onClick prop when clicked', () => {
//   const handleClick = jest.fn()
//   render(<Button onClick={handleClick}>Click Me</Button>)
//   fireEvent.click(screen.getByText(/click me/i))
//   expect(handleClick).toHaveBeenCalledTimes(1)
// })

// describe('Checkbox is checked', () => {
//   test('should pass', () => {
//     const Wrap = () => {
//       const [isChecked, setIsChecked] = useState(false);
//       return <CheckBox isChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />;
//     };
//     const { container } = render(<Wrap />);
//     const checkbox = container.querySelectorAll("input[type='checkbox']")[0] as HTMLInputElement;
//     fireEvent.click(checkbox);
//     expect(checkbox.checked).toBe(true);
//   });
// });

describe('Checkbox', () => {
  it('should mount', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  // it('should pass', () => {
  //   const Wrap = () => {
  //     const [isChecked, setIsChecked] = useState(false);
  //     return <Checkbox isChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />;
  //   };
  //   const { container } = render(<Wrap />);
  //   const checkbox = container.querySelectorAll("input[type='checkbox']")[0] as HTMLInputElement;
  //   fireEvent.click(checkbox);
  //   expect(checkbox.checked).toBe(true);
  // });

//   (method) TestingLibraryMatchers<(str: string) => any, void>.toBeChecked(): void
// @description
// Assert whether the given element is checked.

// It accepts an input of type checkbox or radio and elements with a role of radio with a valid aria-checked attribute of "true" or "false".

// @example

// <input
//   type="checkbox"
//   checked
//   data-testid="input-checkbox" />

// const inputCheckbox = getByTestId('input-checkbox')

// expect(inputCheckbox).toBeChecked()
// expect(inputRadio).not.toBeChecked()

  it("checks that checkbox gets checked", () => {
    render(
      <input
        type="checkbox"
        aria-label="checkbox"
        name="checkbox-array"
        value="second"
        id="second"
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "checkbox" });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should have correct display value from props', () => {
    setup();
    expect(screen.getByDisplayValue(props.attributes.checkboxField)).toBeTruthy();
  });
});