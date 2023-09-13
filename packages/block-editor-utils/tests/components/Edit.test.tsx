import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Edit from '../../src/components/Edit.js';

afterEach(() => {
  jest.clearAllMocks();
});

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

const blockJson = {
  title: 'SimpleBlock',
  attributes: {
    message: {
      type: 'string',
      default: 'Hello World',
    },
  },
  category: '',
};

describe('<Edit />', () => {
  it('renders the Block Component Preview if `isSelected=false`', () => {
    const blockProps = {
      clientId: '1',
      setAttributes: () => null,
      context: {},
      attributes: {
        message: 'Hello',
      },
      isSelected: false,
      className: 'SimpleBlock',
    };
    render(
      <Edit
        config={{}}
        blockJson={blockJson}
        block={SimpleBlock}
        props={blockProps}
        wp={null}
      />,
    );
    expect(screen.getByText(blockProps.attributes.message))
      .toMatchInlineSnapshot(`
      <div
        class="SimpleBlock"
      >
        Hello
      </div>
    `);
  });
  it('renders the Edit Form Component if `isSelected=true`', () => {
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
      <Edit
        config={{}}
        blockJson={blockJson}
        block={SimpleBlock}
        props={blockProps}
        wp={null}
      />,
    );
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
