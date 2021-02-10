[@wpengine/headless](README.md) / Exports

# @wpengine/headless

## Table of contents

### Interfaces

- [CookieOptions](interfaces/cookieoptions.md)
- [HeadlessConfig](interfaces/headlessconfig.md)
- [MenuItem](interfaces/menuitem.md)
- [ParsedUrlInfo](interfaces/parsedurlinfo.md)
- [UriInfo](interfaces/uriinfo.md)

### Variables

- [APOLLO\_STATE\_PROP\_NAME](modules.md#apollo_state_prop_name)
- [COOKIE\_KEY](modules.md#cookie_key)

### Functions

- [HeadlessProvider](modules.md#headlessprovider)
- [Menu](modules.md#menu)
- [NextTemplateLoader](modules.md#nexttemplateloader)
- [TemplateLoader](modules.md#templateloader)
- [WPHead](modules.md#wphead)
- [addApolloState](modules.md#addapollostate)
- [authorize](modules.md#authorize)
- [ensureAuthorization](modules.md#ensureauthorization)
- [getAccessToken](modules.md#getaccesstoken)
- [getAccessTokenAsCookie](modules.md#getaccesstokenascookie)
- [getContentNode](modules.md#getcontentnode)
- [getGeneralSettings](modules.md#getgeneralsettings)
- [getPosts](modules.md#getposts)
- [getUriInfo](modules.md#geturiinfo)
- [headlessConfig](modules.md#headlessconfig)
- [initializeApollo](modules.md#initializeapollo)
- [initializeCookies](modules.md#initializecookies)
- [initializeNextServerSideProps](modules.md#initializenextserversideprops)
- [initializeNextStaticPaths](modules.md#initializenextstaticpaths)
- [initializeNextStaticProps](modules.md#initializenextstaticprops)
- [nextAuthorizeHandler](modules.md#nextauthorizehandler)
- [storeAccessToken](modules.md#storeaccesstoken)
- [useApollo](modules.md#useapollo)
- [useGeneralSettings](modules.md#usegeneralsettings)
- [useNextUriInfo](modules.md#usenexturiinfo)
- [usePost](modules.md#usepost)
- [usePosts](modules.md#useposts)
- [useUriInfo](modules.md#useuriinfo)

## Variables

### APOLLO\_STATE\_PROP\_NAME

• `Const` **APOLLO\_STATE\_PROP\_NAME**: *__APOLLO_STATE__*= '\_\_APOLLO\_STATE\_\_'

Defined in: [provider/apolloClient.ts:27](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/provider/apolloClient.ts#L27)

___

### COOKIE\_KEY

• `Const` **COOKIE\_KEY**: *string*

Defined in: [auth/cookie.ts:13](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/cookie.ts#L13)

## Functions

### HeadlessProvider

▸ **HeadlessProvider**(`__namedParameters`: *React.PropsWithChildren*<PageProps\>): JSX.Element

Provider component to be used in your Next.js Custom `App` component (pages/_app.js)

**`see`** https://nextjs.org/docs/advanced-features/custom-app

**`example`** 
```ts
import {WPGraphQLProvider} from '@wpengine/headless/graphql'

function MyApp({Component, pageProps}) {
    return (
        <WPGraphQLProvider>
            <Component {...pageProps} />
        </WPGraphQLProvider>
    )
}

export default MyApp
```

#### Parameters:

• **__namedParameters**: *React.PropsWithChildren*<PageProps\>

**Returns:** JSX.Element

Defined in: [provider/HeadlessProvider.tsx:32](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/provider/HeadlessProvider.tsx#L32)

___

### Menu

▸ **Menu**(`__namedParameters`: Props): JSX.Element \| *null*

Menu component to display menu items.

**`example`** 
```ts
import { Menu, MenuItem } from '@wpengine/headless/components'

function MyApp() {
    const items = [
       { title: "Home", href: "/" },
       {
          title: "About",
          href: "/about",
          children: [{ title: "Careers", href: "/careers" }],
       },
    ];

    // Alter link output if required. Remember to import `Link` components.
    const nextLink = (item: MenuItem): React.ReactNode => (
        <Link href={item.href}>
            <a>{item.title}</a>
        </Link>
    );
    const reactRouterLink = (item: MenuItem): React.ReactNode => (
        <Link to={item.href}>{item.title}</Link>
    );

    return (
        <>
            <Menu items={items} />
            <Menu items={items} className="menu" ariaLabel="main" />
            <Menu items={items} anchor={nextLink} />
            <Menu items={items} anchor={reactRouterLink} />
        </>
    );
}

export default MyApp
```

#### Parameters:

• **__namedParameters**: Props

**Returns:** JSX.Element \| *null*

Defined in: [components/menu/Menu.tsx:54](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/components/menu/Menu.tsx#L54)

___

### NextTemplateLoader

▸ **NextTemplateLoader**(`__namedParameters`: { `templates`: WPTemplates  }): JSX.Element \| *null*

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`templates` | WPTemplates |

**Returns:** JSX.Element \| *null*

Defined in: [components/NextTemplateLoader.tsx:6](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/components/NextTemplateLoader.tsx#L6)

___

### TemplateLoader

▸ **TemplateLoader**(`__namedParameters`: { `dynamicLoader`: (`loader`: () => *Promise*<Template\>) => React.ComponentType ; `templates`: WPTemplates ; `uriInfo`: [*UriInfo*](interfaces/uriinfo.md) \| *undefined*  }): JSX.Element \| *null*

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dynamicLoader` | (`loader`: () => *Promise*<Template\>) => React.ComponentType |
`templates` | WPTemplates |
`uriInfo` | [*UriInfo*](interfaces/uriinfo.md) \| *undefined* |

**Returns:** JSX.Element \| *null*

Defined in: [components/TemplateLoader.tsx:22](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/components/TemplateLoader.tsx#L22)

___

### WPHead

▸ **WPHead**(): JSX.Element

**Returns:** JSX.Element

Defined in: [components/WPHead.tsx:5](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/components/WPHead.tsx#L5)

___

### addApolloState

▸ **addApolloState**(`client`: *ApolloClient*<NormalizedCacheObject\>, `pageProps`: *GetServerSidePropsResult*<*unknown*\> \| *GetStaticPropsResult*<*unknown*\>): {} \| {} \| {} \| {} \| {} \| {}

Merges the Apollo state with the page props passed through the various Next.js Data Fetching
functions such as getStaticProps, getServerSideProps, etc.

**`example`** 
```ts
export async function getStaticProps({preview = false}) {
    const apolloClient = initializeApollo()

    await apolloClient.query({query: YOUR_QUERY})

    return addApolloState(apolloClient, {
        props: {preview},
        revalidate: 1
    })
}
```

#### Parameters:

Name | Type |
------ | ------ |
`client` | *ApolloClient*<NormalizedCacheObject\> |
`pageProps` | *GetServerSidePropsResult*<*unknown*\> \| *GetStaticPropsResult*<*unknown*\> |

**Returns:** {} \| {} \| {} \| {} \| {} \| {}

Defined in: [provider/apolloClient.ts:166](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/provider/apolloClient.ts#L166)

___

### authorize

▸ **authorize**(`code`: *string*): *Promise*<{ `access_token?`: *string*  }\>

Exchanges an Authorization Code for an Access Token that you can use to make authenticated requests to
the WordPress API

**`async`** 

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`code` | *string* |

**Returns:** *Promise*<{ `access_token?`: *string*  }\>

>}

Defined in: [auth/authorize.ts:35](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/authorize.ts#L35)

___

### ensureAuthorization

▸ **ensureAuthorization**(`redirectUri`: *string*, `options?`: [*CookieOptions*](interfaces/cookieoptions.md)): *string* \| { `redirect`: *string*  } \| *undefined*

Checks for an existing Access Token and returns one if it exists. Otherwise returns
an object containing a redirect URI to send the client to for authorization.

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`redirectUri` | *string* |
`options?` | [*CookieOptions*](interfaces/cookieoptions.md) |

**Returns:** *string* \| { `redirect`: *string*  } \| *undefined*

)}

Defined in: [auth/authorize.ts:74](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/authorize.ts#L74)

___

### getAccessToken

▸ **getAccessToken**(`options?`: [*CookieOptions*](interfaces/cookieoptions.md)): *string* \| *undefined*

Gets an Access Token from the cookie, if it exists

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*CookieOptions*](interfaces/cookieoptions.md) |

**Returns:** *string* \| *undefined*

Defined in: [auth/cookie.ts:37](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/cookie.ts#L37)

___

### getAccessTokenAsCookie

▸ **getAccessTokenAsCookie**(`options?`: [*CookieOptions*](interfaces/cookieoptions.md)): *string* \| *undefined*

Gets an Access Token from the cookie and formats it as a cookie pair

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*CookieOptions*](interfaces/cookieoptions.md) |

**Returns:** *string* \| *undefined*

Defined in: [auth/cookie.ts:56](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/cookie.ts#L56)

___

### getContentNode

▸ **getContentNode**(`client`: *ApolloClient*<NormalizedCacheObject\>, `id`: *string*, `idType?`: WPGraphQL.ContentNodeIdTypeEnum, `asPreview?`: *boolean*): *Promise*<WPGraphQL.GetContentNodeQuery[*contentNode*] \| WPGraphQL.GetContentNodeQuery[*contentNode*][*preview*][*node*] \| *undefined*\>

Gets an individual Post or Page from WordPress

**`async`** 

**`export`** 

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | *ApolloClient*<NormalizedCacheObject\> | - |  |
`id` | *string* | - | The identifier for the Post or Page   |
`idType` | WPGraphQL.ContentNodeIdTypeEnum | 'URI' | - |
`asPreview` | *boolean* | false | - |

**Returns:** *Promise*<WPGraphQL.GetContentNodeQuery[*contentNode*] \| WPGraphQL.GetContentNodeQuery[*contentNode*][*preview*][*node*] \| *undefined*\>

Defined in: [api/services.ts:42](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/services.ts#L42)

___

### getGeneralSettings

▸ **getGeneralSettings**(`client`: *ApolloClient*<NormalizedCacheObject\>): *Promise*<WPGraphQL.GeneralSettingsQuery[*generalSettings*]\>

Gets the General Settings from WordPress

**`async`** 

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`client` | *ApolloClient*<NormalizedCacheObject\> |

**Returns:** *Promise*<WPGraphQL.GeneralSettingsQuery[*generalSettings*]\>

Defined in: [api/services.ts:87](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/services.ts#L87)

___

### getPosts

▸ **getPosts**(`client`: *ApolloClient*<NormalizedCacheObject\>): *Promise*<WPGraphQL.GetPostsQuery[*posts*][*nodes*]\>

Gets all posts from WordPress

**`async`** 

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`client` | *ApolloClient*<NormalizedCacheObject\> |

**Returns:** *Promise*<WPGraphQL.GetPostsQuery[*posts*][*nodes*]\>

Defined in: [api/services.ts:21](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/services.ts#L21)

___

### getUriInfo

▸ **getUriInfo**(`client`: *ApolloClient*<NormalizedCacheObject\>, `uriPath`: *string*, `isPreview?`: *boolean*): *Promise*<[*UriInfo*](interfaces/uriinfo.md) \| *void*\>

Gets information about the URI from WordPress

**`async`** 

**`export`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | *ApolloClient*<NormalizedCacheObject\> |  |
`uriPath` | *string* | The path for the URI (e.g. '/hello-world')   |
`isPreview?` | *boolean* | - |

**Returns:** *Promise*<[*UriInfo*](interfaces/uriinfo.md) \| *void*\>

Defined in: [api/services.ts:108](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/services.ts#L108)

___

### headlessConfig

▸ **headlessConfig**(`config?`: [*HeadlessConfig*](interfaces/headlessconfig.md)): [*HeadlessConfig*](interfaces/headlessconfig.md)

A setter/getter for the HeadlessConfig

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`config?` | [*HeadlessConfig*](interfaces/headlessconfig.md) |

**Returns:** [*HeadlessConfig*](interfaces/headlessconfig.md)

Defined in: [config/config.ts:13](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/config/config.ts#L13)

___

### initializeApollo

▸ **initializeApollo**(`context?`: NextPageContext \| GetStaticPropsContext \| GetServerSidePropsContext, `initialState?`: *null*): *ApolloClient*<NormalizedCacheObject\>

Creates the Apollo Client instance if it doesn't already exist. This works on both the client side and server side.

If client side, it will hydrate the cache using initial state passed through Next.js' Data Fetching functions.

**`example`** 
```ts
// Client-side
// For client-side, it's recommended that you use useApollo() instead initializeApollo() directly.
```

**`example`** 
```ts
// Server-side
export async function getStaticProps() {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: ALL_POSTS_QUERY,
        variables: allPostsQueryVars,
    })

    return addApolloState(apolloClient, {
        props: {},
      revalidate: 1,
    })
}
```

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`context?` | NextPageContext \| GetStaticPropsContext \| GetServerSidePropsContext | - |
`initialState` | *null* | null |

**Returns:** *ApolloClient*<NormalizedCacheObject\>

Defined in: [provider/apolloClient.ts:105](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/provider/apolloClient.ts#L105)

___

### initializeCookies

▸ **initializeCookies**(`__namedParameters?`: [*CookieOptions*](interfaces/cookieoptions.md)): Cookies

#### Parameters:

• **__namedParameters**: [*CookieOptions*](interfaces/cookieoptions.md)

**Returns:** Cookies

Defined in: [auth/cookie.ts:15](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/cookie.ts#L15)

___

### initializeNextServerSideProps

▸ **initializeNextServerSideProps**(`context`: GetServerSidePropsContext, `templates?`: WPTemplates): *Promise*<*GetServerSidePropsResult*<*unknown*\>\>

Must be called from getServerSideProps within a Next app in order to support SSR. It will
initialized cookies and prefetch/cache the page content and bundle it with the page for
rehydration on the frontend.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`context` | GetServerSidePropsContext | The Next SSR context   |
`templates?` | WPTemplates | to be made available to the template loader    |

**Returns:** *Promise*<*GetServerSidePropsResult*<*unknown*\>\>

Defined in: [api/initializeNextServerSideProps.ts:19](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/initializeNextServerSideProps.ts#L19)

___

### initializeNextStaticPaths

▸ **initializeNextStaticPaths**(`override?`: GetStaticPathsResult): GetStaticPathsResult

#### Parameters:

Name | Type |
------ | ------ |
`override?` | GetStaticPathsResult |

**Returns:** GetStaticPathsResult

Defined in: [api/initializeNextStaticPaths.ts:9](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/initializeNextStaticPaths.ts#L9)

___

### initializeNextStaticProps

▸ **initializeNextStaticProps**(`context`: GetStaticPropsContext, `templates?`: WPTemplates): *Promise*<*GetServerSidePropsResult*<*unknown*\>\>

Must be called from getServerSideProps within a Next app in order to support SSR. It will
initialized cookies and prefetch/cache the page content and bundle it with the page for
rehydration on the frontend.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`context` | GetStaticPropsContext | The Next SSR context   |
`templates?` | WPTemplates | to be made available to the template loader    |

**Returns:** *Promise*<*GetServerSidePropsResult*<*unknown*\>\>

Defined in: [api/initializeNextStaticProps.ts:19](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/initializeNextStaticProps.ts#L19)

___

### nextAuthorizeHandler

▸ **nextAuthorizeHandler**(`req`: NextApiRequest, `res`: NextApiResponse): *Promise*<*void*\>

A Node handler for processing incomming requests to exchange an Authorization Code
for an Access Token using the WordPress API. Once the code is exchanged, this
handler stores the Access Token on the cookie and redirects to the frontend.

#### Parameters:

Name | Type |
------ | ------ |
`req` | NextApiRequest |
`res` | NextApiResponse |

**Returns:** *Promise*<*void*\>

Defined in: [auth/middleware.ts:10](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/middleware.ts#L10)

___

### storeAccessToken

▸ **storeAccessToken**(`token`: *string* \| *undefined*, `res`: ServerResponse, `options`: [*CookieOptions*](interfaces/cookieoptions.md)): *void*

Stores an Access Token on the cookie

**`export`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`token` | *string* \| *undefined* |  |
`res` | ServerResponse |     |
`options` | [*CookieOptions*](interfaces/cookieoptions.md) | - |

**Returns:** *void*

Defined in: [auth/cookie.ts:77](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/auth/cookie.ts#L77)

___

### useApollo

▸ **useApollo**(`ctx`: NextPageContext, `pageProps`: *Record*<*string*, *any*\>): *ApolloClient*<NormalizedCacheObject\>

React Hook to use the Apollo client. This is used by <WPGraphQLProvider>

**`see`** WPGraphQLProvider

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | NextPageContext |
`pageProps` | *Record*<*string*, *any*\> |

**Returns:** *ApolloClient*<NormalizedCacheObject\>

Defined in: [provider/apolloClient.ts:185](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/provider/apolloClient.ts#L185)

___

### useGeneralSettings

▸ **useGeneralSettings**(): WPGraphQL.GeneralSettings \| *undefined*

React Hook for retrieving the general settings (title, description) from your WordPress site

**`example`** 
```tsx
import { useGeneralSettings } from '@wpengine/headless';

export function Header() {
  const settings = useGeneralSettings();

  if (!settings) {
    return <></>;
  }

  return (
    <header>
      <h1>{settings.title}</h1>
      <h2>{settings.description}</h2>
    </header>
  );
}
```

**`export`** 

**Returns:** WPGraphQL.GeneralSettings \| *undefined*

Defined in: [api/hooks.ts:82](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/hooks.ts#L82)

___

### useNextUriInfo

▸ **useNextUriInfo**(): [*UriInfo*](interfaces/uriinfo.md) \| *undefined*

React Hook for retrieving information about the current URI within a Next app.

**`see`** useUriInfo For similar functionality outside of Next apps.

**`example`** 
```tsx
import { useNextUriInfo } from '@wpengine/headless';

export function Screen() {
  const uriInfo = useNextUriInfo();

  console.log(uriInfo);
}
```

**`export`** 

**Returns:** [*UriInfo*](interfaces/uriinfo.md) \| *undefined*

Defined in: [api/hooks.ts:228](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/hooks.ts#L228)

___

### usePost

▸ **usePost**(): WPGraphQL.GetContentNodeQuery[*contentNode*] \| *undefined*

React Hook for retrieving the post based on the current URI. Uses window.location if necessary

**`example`** 
```tsx
import { usePost } from '@wpengine/headless';

export default function Post() {
  const post = usePost();

  return (
    <div>
      {post && (
        <div>
          <div>
            <h5>{post.title}</h5>
            <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
          </div>
        </div>
      )}
    </div>
  );
}
```

**`export`** 

**Returns:** WPGraphQL.GetContentNodeQuery[*contentNode*] \| *undefined*

Defined in: [api/hooks.ts:267](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/hooks.ts#L267)

▸ **usePost**(`id`: *string*, `idType`: WPGraphQL.ContentNodeIdTypeEnum): WPGraphQL.GetContentNodeQuery[*contentNode*]

React Hook for retrieving the post based on the passed-in id and idType.

**`see`** ContentNodeIdType For the different types of identifiers you can pass in

**`example`** 
```tsx
import { usePost, ContentNodeIdType } from '@wpengine/headless';

export default function Post({ slug }: { slug: string; }) {
  const post = usePost(slug, ContentNodeIdType.SLUG);

  return (
    <div>
      {post && (
        <div>
          <div>
            <h5>{post.title}</h5>
            <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
          </div>
        </div>
      )}
    </div>
  );
}
```

**`export`** 

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | *string* | The identifier for the post based on ContentNodeIdType   |
`idType` | WPGraphQL.ContentNodeIdTypeEnum | The description of the type of id passed in   |

**Returns:** WPGraphQL.GetContentNodeQuery[*contentNode*]

Defined in: [api/hooks.ts:301](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/hooks.ts#L301)

___

### usePosts

▸ **usePosts**(): WPGraphQL.GetPostsQuery[*posts*][*nodes*] \| *undefined*

React Hook for retrieving a list of posts from your WordPress site

**`example`** 
```tsx
import { usePosts } from '@wpengine/headless';

export function ListPosts() {
  const posts = usePosts();

  if (!posts) {
    return <></>;
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} dangerouslySetInnerHTML={ { __html: post.content ?? '' } } />
      ))}
    </>
  );
}
```

**`export`** 

**Returns:** WPGraphQL.GetPostsQuery[*posts*][*nodes*] \| *undefined*

Defined in: [api/hooks.ts:49](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/hooks.ts#L49)

___

### useUriInfo

▸ **useUriInfo**(`uri?`: *string*, `resolvedUri?`: *string*): [*UriInfo*](interfaces/uriinfo.md) \| *undefined*

React Hook for retrieving information about the current URI. Expects you to
either pass in a URI, otherwise it will use window.location

**`see`** useNextUriInfo For similar functionality inside Next apps.

**`example`** 
```tsx
import { useUriInfo } from '@wpengine/headless';

export function Screen() {
  const uriInfo = useUriInfo();

  console.log(uriInfo);
}
```

**`export`** 

#### Parameters:

Name | Type |
------ | ------ |
`uri?` | *string* |
`resolvedUri?` | *string* |

**Returns:** [*UriInfo*](interfaces/uriinfo.md) \| *undefined*

Defined in: [api/hooks.ts:107](https://github.com/wpengine/headless-framework/blob/9e3ac37/packages/headless/src/api/hooks.ts#L107)
