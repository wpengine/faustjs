import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Preview from '../../src/components/Preview.js';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('@wordpress/block-editor', () => {
  const originalModule = jest.requireActual('@wordpress/block-editor');
  return {
    ...originalModule,
    useBlockProps: jest.fn()
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
describe('<Preview />', () => {
  it('renders the Block Component Preview successfully', () => {
    const blockProps = {
      clientId: '1',
      setAttributes: () => null,
      context: {},
      isSelected: false,
      attributes: {
        message: 'Hello',
      },
      className: 'SimpleBlock',
    };
    render(<Preview block={SimpleBlock} props={blockProps} />);
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
