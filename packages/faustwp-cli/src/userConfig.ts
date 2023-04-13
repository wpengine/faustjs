import Configstore from 'configstore';

const CONFIG_STORE_NAME = 'faust';

export type ConfigStoreType = Omit<Configstore, 'all'> & {
  all: {
    telemetry?: {
      enabled?: boolean;
      anonymousId?: string;
      notifiedAt?: number;
    };
  };
};

export const userConfig = new Configstore(CONFIG_STORE_NAME) as ConfigStoreType;
