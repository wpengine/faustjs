import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import RichText from '../../src/controls/RichText';
import { Field } from '../../src/types';
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
  location: 'editor',
  control: 'text',
  label: 'richtextfield',
  default: 'Hello World',
  name: 'richText',
  type: 'string',
};

// This should set the checkbox value (aka check the box)
const props = {
  setAttributes: jest.fn(),
  attributes: {
    richText: 'Hello <b>World</b>',
  },
};

const setup = () => {
  const utils = render(<RichText config={config} props={props} />);
  const input = screen.findAllByDisplayValue(props.attributes.richText!);
  return {
    input,
    ...utils,
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('RichText', () => {
  it('should mount', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('should have correct display value from props', () => {
    setup();
    expect(screen.getByRole('textbox')).toMatchInlineSnapshot(`
      <div
        aria-label="richtextfield"
        aria-multiline="true"
        class="block-editor-rich-text__editable components-text-control__input rich-text"
        contenteditable="true"
        id="wp-components-base-control-1"
        label="richtextfield"
        role="textbox"
        style="white-space: pre-wrap; min-width: 1px;"
      >
        Hello 
        <b>
          World
        </b>
        
      </div>
    `);
  });
});
