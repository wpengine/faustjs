import registerControl from '../helpers/registerControl.js';
import Text from './Text.js';
import NumberField from './Number.js';
import Color from './Color.js';
import Checkbox from './Checkbox.js';

registerControl('text', Text);
registerControl('number', NumberField);
registerControl('color', Color);
registerControl('checkbox', Checkbox);
