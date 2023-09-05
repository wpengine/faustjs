import { addFilter } from '@wordpress/hooks';
import { Control, FieldControl } from '../types/index.js';

function registerControl(name: FieldControl, control: Control) {
  addFilter(
    'faustBlockEditorUtils.controls',
    'faust-block-editor-utils',
    (controls: { [key: string]: Control }) => {
      // eslint-disable-next-line no-param-reassign
      controls[name] = control;
      return controls;
    },
  );
}

export default registerControl;
