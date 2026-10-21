---
title: "useLogout"
description: "Reference for the useLogout hook that provides functionality to log out users from your Faust.js application."
---

`useLogout` is a React hook that facilitates logging out from your Faust app.

## API

The `useLogout` exports look like this defined as a TypeScript type:

```ts
type UseLogout = {
	loading: boolean;
	error: Response | undefined;
	logout: (redirectUrl?: string) => void;
};
```

Here is a description of each:

- `loading`: If `true`, the request is still in flight.
- `error`: If the logout process produces one or more errors, this object contains either an array of `graphQLErrors` or a single `networkError`. Otherwise, this value is `undefined`.
- `logout`: Callback function to initiate the logout request. You can pass an optional `redirectUrl` parameter that is used to redirect once you successfully complete the process. If the user also has a WordPress session in this browser, for example because they logged in through WordPress, `logout` ends that session too, so the user isn't logged straight back in. This needs the latest FaustWP plugin; with older versions, only the Faust session ends.

## Usage

Below is an example of displaying a logout button, and upon successful logout, redirecting the user back to the homepage:

```js
import { useLogout } from "@faustwp/core";

export function AuthenticatedView() {
	const { logout } = useLogout();

	return (
		<>
			<button onClick={() => logout("/")}>Logout</button>
		</>
	);
}
```
