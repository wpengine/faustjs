import Example from './example';
import EmailOptIn from './email-opt-in';

const namespace = 'genesis-custom-blocks';
const blockComponents = {
  [`${namespace}/example`]: Example,
  [`${namespace}/email-opt-in`]: EmailOptIn,
};

export default blockComponents;
