import Configstore from 'configstore';

const CONFIG_STORE_NAME = 'faust';
export const userConfig = new Configstore(CONFIG_STORE_NAME);
