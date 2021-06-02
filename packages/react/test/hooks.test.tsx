import { gql } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
  GENERAL_SETTINGS,
  GET_URI_INFO,
  headlessConfig,
} from '@wpengine/headless-core';
import React, { PropsWithChildren } from 'react';
import { useGeneralSettings, useUriInfo } from '../src/hooks';

const TEST_WP_URL = 'http://headless.local';
const TEST_REACT_URL = 'http://localhost:3000';

beforeAll(() => {
  headlessConfig({
    wpUrl: TEST_WP_URL,
  });
});

// Use mock data in the Apollo MockedProvider for our custom Hooks
const mockGeneralSettings = {
  request: {
    query: gql`
      ${GENERAL_SETTINGS}
    `,
  },
  result: {
    data: {
      generalSettings: {
        title: 'My WordPress Site',
        description: 'Just another WordPress site',
        url: TEST_WP_URL,
      },
    },
  },
};

const mockSamplePage = {
  request: {
    query: gql`
      ${GET_URI_INFO}
    `,
    variables: {
      uri: 'sample-page',
    },
  },
  result: {
    data: {
      nodeByUri: {
        id: 'cG9zdDoy',
        conditionalTags: {
          isArchive: false,
          isSingular: true,
        },
      },
    },
  },
};

const mocks: ReadonlyArray<MockedResponse> = [
  mockGeneralSettings,
  mockSamplePage,
];

describe('useGeneralSettings', () => {
  test('useGeneralSettings() gets the title, description, and url', async () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGeneralSettings(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { title, description, url } =
      mockGeneralSettings.result.data.generalSettings;

    expect(result.current?.title).toBe(title);
    expect(result.current?.description).toBe(description);
    expect(result.current?.url).toBe(url);
  });
});

describe('useUriInfo', () => {
  test('useUriInfo gets uri info from window', async () => {});

  test('useUriInfo gets uri info from a specific WordPress page', async () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(
      () => useUriInfo(`${TEST_REACT_URL}/sample-page`),
      { wrapper },
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { uri } = mockSamplePage.request.variables;
    const { id } = mockSamplePage.result.data.nodeByUri;

    expect(result.current?.uriPath).toBe(uri);
    expect(result.current?.id).toBe(id);
  });
});
