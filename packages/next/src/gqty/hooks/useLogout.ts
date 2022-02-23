import { config as coreConfig } from '@faustjs/core';
// eslint-disable-next-line import/extensions
import { LOGOUT_ENDPOINT_PARTIAL_PATH } from '@faustjs/core/config';
import type { RequiredSchema } from '@faustjs/react';
import { isNil } from 'lodash';
import { useState } from 'react';
import type { NextClient } from '../client.js';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
    };
  } = never,
>(): NextClient<Schema, ObjectTypesNames, ObjectTypes>['auth']['useLogout'] {
  return () => {
    const { apiBasePath } = coreConfig();

    if (isNil(apiBasePath)) {
      throw new Error(
        'apiBasePath needs to be defined to use the useLogout hook',
      );
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState<boolean | undefined>(
      undefined,
    );

    /**
     * Callable function to logout the existing user.
     */
    async function logout() {
      setIsLoading(true);

      const res = await fetch(
        `${apiBasePath as string}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`,
        {
          method: 'POST',
        },
      );

      setIsLoading(false);

      if (res.ok) {
        setIsLoggedOut(true);
      } else {
        setIsLoggedOut(false);
      }
    }

    return { logout, isLoggedOut, isLoading };
  };
}
