import { useEffect } from 'react';
import { ensureAuthorizationNew, getAccessTokenNew } from '@faustjs/core';
import { client } from 'client';

export default function Page() {
  const { useAuth } = client;
  const { isLoading, isAuthenticated } = useAuth();

  console.log('isLoading', isLoading);
  console.log('isAuthenticated', isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please login</div>;
  } else {
    return <div>Welcome to the app</div>;
  }
}
