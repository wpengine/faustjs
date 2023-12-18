import registerControl from '../helpers/registerControl.js';
import Text from './Text.js';
import NumberField from './Number.js';
import Color from './Color.js';
import Checkbox from './Checkbox.js';
import Select from './Select.js';
import Radio from './Radio.js';
import Range from './Range.js';
import Rich from './RichText.js';

registerControl('text', Text);
registerControl('number', NumberField);
registerControl('color', Color);
registerControl('checkbox', Checkbox);
registerControl('select', Select);
registerControl('radio', Radio);
registerControl('range', Range);
registerControl('rich-text', Rich);
