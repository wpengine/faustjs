'use server';

import { onLogin } from '@faustwp/experimental-app-router';
import { redirect } from 'next/navigation';

export async function loginAction(prevData: any, formData: FormData) {
  const res = await onLogin(formData);

  if (res.error) {
    return res;
  }

  redirect('/my-account');
}
