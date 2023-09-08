/** @jest-environment jsdom */
import React from "react"
import Color from '../../src/controls/Color'
import { render, screen } from '@testing-library/react';
// Do I need the edit component here, since we are editing the content of ColorControl?
import Edit from '../../src/components/Edit.js';

//which jest.mock function argument? for the block, or for the editor?
import { registerBlockType } from '@wordpress/blocks';
// jest.mock('@wordpress/blocks');


// https://github.com/WordPress/gutenberg/blob/6d9850ad9c244736cc8687612ea8cc43e9d0f453/packages/components/src/color-picker/test/index.tsx
afterEach(() => {
  jest.clearAllMocks();
});

// this code is taken from the Edit.test.tsx file to emulate the block editor in the testing environment
// I think all this stays the same.

// jest.mock('@wordpress/block-editor', () => {
//   const originalModule = jest.requireActual('@wordpress/block-editor');
//   return {
//     ...originalModule,
//     InspectorControls: jest.fn((props) => <div>{props.children}</div>),
//     useBlockProps: jest.fn(),
//   };
// });

jest.mock('@wordpress/element', () => {
  const originalModule = jest.requireActual('@wordpress/element');
  return {
    ...originalModule,
    useMemo: jest.fn(),
    useCallback: jest.fn(),
    useContext: jest.fn()
  };
});

// this is the interface we use to shape the props that the SimpleBlock takes below
// changed attributes to colorPicker
interface BlockProps {
  className?: string;
  attributes?: {
    colorPicker: string;
  };
}

const SimpleBlock = (props: BlockProps) => (
  <div className={props.className}>{props?.attributes?.colorPicker}</div>
);
SimpleBlock.config = {
  name: 'SimpleBlock',
};


// Added block.json attribute, colorPicker 
const blockJson = {
  title: 'SimpleBlock',
  attributes: {
    colorPicker: {
        type: 'string',
        default: '#fff'
  },
  },
};

// test the display value of <p> to ensure config.label from Color matches snapshot
// acquire snapshot ( .toMatchInlineSnapshot)

describe('<Color />', () => {
  it('renders the Color control component in the sidebar if the blocks `isSelected=true` and when a change occurs, it calls the attributes callback', () => {
    const blockProps = {
      // setAttributes: () => null,
      isSelected: true,
      attributes: {
        colorPicker: '#fff'
      },
      className: 'SimpleBlock',
    };

    // from my reading, this seems correct, but the Color component is read as null
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
    // Should I have added a color control aria-label? It wasn't set above for the example, and I don't see this in devtools
    expect(screen.getByLabelText('SimpleBlock'))
      .toMatchInlineSnapshot(`
      <>
        <p style={{ marginBottom: '10px' }}>{colorPicker}</p>
        <ColorPicker color={props.attributes[config.name]} onChange={onChange} />
      </>
    `);
  });
});