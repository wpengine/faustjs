import { client as createClient } from '@wpengine/headless-react';
import { headlessConfig } from '@wpengine/headless-core';

headlessConfig({
  wpUrl: process.env.REACT_APP_WORDPRESS_URL || '',
});

export default createClient();
