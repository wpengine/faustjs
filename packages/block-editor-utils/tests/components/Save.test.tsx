import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Save from '../../src/components/Save.js';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('@wordpress/block-editor', () => {
  const originalModule = jest.requireActual('@wordpress/block-editor');
  return {
    ...originalModule,
    useBlockProps: {
      save: jest.fn(),
    },
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
describe('<Save />', () => {
  it('renders the Block Component successfully', () => {
    const blockProps = {
      attributes: {
        message: 'Hello',
      },
      className: 'SimpleBlock',
    };
    render(<Save block={SimpleBlock} props={blockProps} wp={null} />);
    expect(screen.getByText(blockProps.attributes.message))
      .toMatchInlineSnapshot(`
      <div
        class="SimpleBlock"
      >
        Hello
      </div>
    `);
  });
});
