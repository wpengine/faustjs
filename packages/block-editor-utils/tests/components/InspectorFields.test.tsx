import * as React from 'react';
import { render, screen } from '@testing-library/react';
import InspectorFields from '../../src/components/InspectorFields.js';
import { actions, filters, addFilter } from '@wordpress/hooks';
import { Control, Field } from '../../src/types/index.js';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('@wordpress/block-editor', () => {
  const originalModule = jest.requireActual('@wordpress/block-editor');
  return {
    ...originalModule,
    InspectorControls: jest.fn((props) => (
      <div data-testid="inspector-controls-test">{props.children}</div>
    )),
  };
});
jest.mock('@wordpress/components', () => {
  const originalModule = jest.requireActual('@wordpress/components');
  return {
    ...originalModule,
    PanelBody: jest.fn((props) => (
      <div data-testid="panel-body-test">{props.children}</div>
    )),
  };
});

beforeEach(() => {
  [actions, filters].forEach((hooks) => {
    for (const k in hooks) {
      if ('__current' === k) {
        continue;
      }

      delete hooks[k];
    }
    delete hooks.all;
  });
});

function filterA(controls: { [key: string]: Control }) {
  // eslint-disable-next-line no-param-reassign
  controls.color = () => <div>Another Color</div>;
  return controls;
}

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

describe('<InspectorFields />', () => {
  it('renders an empty InspectorFields if no fields are provided', () => {
    const fields: Field[] = [];
    addFilter('faustBlockEditorUtils.controls', 'my_callback', filterA);
    render(<InspectorFields fields={fields} props={blockProps} />);
    expect(screen.getByTestId('inspector-controls-test'))
      .toMatchInlineSnapshot(`
      <div
        data-testid="inspector-controls-test"
      />
    `);
  });
  it('renders InspectorFields if matching fields are provided', () => {
    const fields: Field[] = [
      {
        type: 'string',
        control: 'color',
        name: 'myColor',
        location: 'inspector',
      },
      {
        type: 'string',
        control: 'text',
        name: 'myText',
        location: 'inspector',
      },
    ];
    addFilter('faustBlockEditorUtils.controls', 'my_callback', filterA);
    render(<InspectorFields fields={fields} props={blockProps} />);
    expect(screen.getAllByText('Another Color')).toHaveLength(1);
  });
});
