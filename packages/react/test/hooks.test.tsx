import React from 'react';
import { gql } from '@apollo/client';
import { useGeneralSettings } from '../src/hooks';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GENERAL_SETTINGS } from '@wpengine/headless-core';

// Use mock data in the Apollo MockedProvider for our custom Hooks
const generalSettingsMock = {
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
        url: 'http://headless.local',
      },
    },
  },
};

const mocks: ReadonlyArray<MockedResponse> = [generalSettingsMock];

describe('useGeneralSettings', () => {
  test('useGeneralSettings() gets the title, description, and url', async () => {
    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGeneralSettings(), { wrapper });

    /**
     * Use a setTimeout within an act() to test the "success" state of the hook.
     * @link https://www.apollographql.com/docs/react/development-testing/testing/#testing-the-success-state
     */
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { title, description, url } =
      generalSettingsMock.result.data.generalSettings;

    expect(result.current?.title).toBe(title);
    expect(result.current?.description).toBe(description);
    expect(result.current?.url).toBe(url);
  });
});
