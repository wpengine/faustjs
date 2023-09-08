/** @jest-environment jsdom */
import React from "react"
import Color from '../../src/controls/Color'
import { render, screen } from '@testing-library/react';
// Do I need the edit component here, since we are editing the content of ColorControl?
import Edit from '../../src/components/Edit.js';

//which jest.mock function argument? for the block, or for the editor?
import { registerBlockType } from '@wordpress/blocks';
// jest.mock('@wordpress/blocks');

afterEach(() => {
  jest.clearAllMocks();
});

// this code is taken from the Edit.test.tsx file to emulate the block editor in the testing environment
// I think all this stays the same.

jest.mock('@wordpress/block-editor', () => {
  const originalModule = jest.requireActual('@wordpress/block-editor');
  return {
    ...originalModule,
    InspectorControls: jest.fn((props) => <div>{props.children}</div>),
    useBlockProps: jest.fn(),
  };
});

interface BlockProps {
  className?: string;
  attributes?: {
    message: string;
  };
}

const SimpleBlock = (props: BlockProps) => (
  <div className={props.className}>{props?.attributes?.message}</div>
);
SimpleBlock.config = {
  name: 'SimpleBlock',
};


// Added block.json attribute, colorPicker 
// TODO: delete message attribute
const blockJson = {
  title: 'SimpleBlock',
  attributes: {
    message: {
      type: 'string',
      default: 'Hello World',
    },
    colorPicker: {
        type: 'string',
        default: '#fff'
  },
  },
  category: '',
};

// Where can I tell the test to look in the Sidebar for the results of the block being selected?
describe('<Color />', () => {
  it('renders the Color control component in the sidebar if the blocks `isSelected=true`', () => {
    const blockProps = {
      clientId: '1',
      setAttributes: () => null,
      context: {},
      isSelected: true,
      attributes: {
        message: 'Hello',
      },
      className: 'SimpleBlock',
    };
    render(
      <Color
        config={{
            name: 'SimpleBlock',
            type: 'string',
            control: 'color',
            location: 'inspector'
        }}
        // blockJson={blockJson}
        // block={SimpleBlock}
        props={blockProps}
        // wp={null}
      />,
    );
    // where can I find the color control aria-label? It wasn't set above for the example, and I don't see this in devtools
    expect(screen.getByLabelText('Faust block editor form'))
      .toMatchInlineSnapshot(`
      <div
        aria-label="Faust block editor form"
        class="faust-editor-form"
        style="padding: 0px 10px; margin: 20px 0px; border: 1px solid black;"
      >
        <h3
          class="faust-editor-form__heading"
          style="margin: 10px 0px; display: flex; align-items: center;"
        >
          SimpleBlock
        </h3>
      </div>
    `);
  });
});