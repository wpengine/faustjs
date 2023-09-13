import registerControl from '../helpers/registerControl.js';
import Text from './Text.js';
import NumberField from './Number.js';
import Color from './Color.js';
import Select from './Select.js';
import Radio from './Radio.js';

registerControl('text', Text);
registerControl('number', NumberField);
registerControl('color', Color);
registerControl('select', Select);
registerControl('radio', Radio);
