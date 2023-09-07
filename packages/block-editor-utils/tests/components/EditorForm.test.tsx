import * as React from 'react';
import { render, screen } from '@testing-library/react';
import EditorForm from '../../src/components/EditorForm.js';
import { actions, filters, addFilter } from '@wordpress/hooks';
import { Control, Field } from '../../src/types/index.js';

afterEach(() => {
  jest.clearAllMocks();
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

const blockJson = {
  title: 'SimpleBlock',
  icon: 'star',
  category: 'text',
  attributes: {},
};

describe('<EditorForm />', () => {
  it('renders an empty EditorForm if no fields are provided', () => {
    const fields: Field[] = [];
    addFilter('faustBlockEditorUtils.controls', 'my_callback', filterA);
    render(
      <EditorForm fields={fields} props={blockProps} blockJson={blockJson} />,
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
          <span
            class="dashicon dashicons dashicons-star"
            style="font-size: 24px; width: 24px; height: 24px; margin-right: 10px;"
          />
          SimpleBlock
        </h3>
      </div>
    `);
  });
  it('renders EditorForm if matching fields are provided', () => {
    const fields: Field[] = [
      {
        type: 'string',
        control: 'color',
        name: 'myColor',
        location: 'editor',
      },
      {
        type: 'string',
        control: 'text',
        name: 'myText',
        location: 'inspector',
      },
    ];
    addFilter('faustBlockEditorUtils.controls', 'my_callback', filterA);
    render(
      <EditorForm fields={fields} props={blockProps} blockJson={blockJson} />,
    );
    expect(screen.getAllByText('Another Color')).toHaveLength(1);
  });
});
