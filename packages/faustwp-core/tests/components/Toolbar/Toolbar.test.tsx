/** @jest-environment jsdom */
import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { waitFor, queryByAttribute, within } from '@testing-library/dom';
import { Hooks } from '@wordpress/hooks/build-types';
import { FaustToolbarNodes } from '../../../src';
import { setConfig } from '../../../src/config/index';
import * as apollo from '@apollo/client';

import { Toolbar } from '../../../src/components/Toolbar';
import { OperationVariables, QueryResult } from '@apollo/client';

let mockIsAuthenticated = false;
let mockIsReady = false;
jest.mock('../../../src/hooks/useAuth', () => {
  return {
    useAuth: jest.fn(() => ({
      isAuthenticated: mockIsAuthenticated,
      isReady: mockIsReady,
    })),
  };
});

test('returns null if not authenticated', async () => {
  expect.assertions(1);
  const dom = render(<Toolbar />);
  const navElement = await waitFor(() =>
    queryByAttribute('id', dom.container, 'wpadminbar'),
  );
  expect(navElement).not.toBeInTheDocument();
});

test('renders the toolbar if user preference is true', async () => {
  expect.assertions(1);
  mockIsAuthenticated = true;

  const mockUseQuery = {
    data: {
      viewer: {
        shouldShowFaustToolbar: true,
      },
    },
  } as any as QueryResult<unknown, unknown>;

  const useQuerySpy = jest
    .spyOn(apollo, 'useQuery')
    .mockReturnValue(mockUseQuery);

  const dom = render(<Toolbar />);

  const navElement = await waitFor(() =>
    queryByAttribute('id', dom.container, 'wpadminbar'),
  );

  expect(navElement).toBeInTheDocument();
});

test('doesnt render the toolbar if user preference is false', async () => {
  expect.assertions(1);
  mockIsAuthenticated = true;

  const mockUseQuery = {
    data: {
      viewer: {
        shouldShowFaustToolbar: false,
      },
    },
  } as any as QueryResult<unknown, unknown>;

  const useQuerySpy = jest
    .spyOn(apollo, 'useQuery')
    .mockReturnValue(mockUseQuery);

  const dom = render(<Toolbar />);

  const navElement = await waitFor(() =>
    queryByAttribute('id', dom.container, 'wpadminbar'),
  );
  expect(navElement).not.toBeInTheDocument();
});

test('render the toolbar if user preference request throws an error/fails', async () => {
  expect.assertions(1);
  mockIsAuthenticated = true;

  /**
   * Likely to happen if a user is using a version of FaustWP without the
   * "shouldShowFaustToolbar" graphql field.
   */
  const mockUseQuery = {
    error: {}, // Request error
  } as any as QueryResult<unknown, unknown>;

  const useQuerySpy = jest
    .spyOn(apollo, 'useQuery')
    .mockReturnValue(mockUseQuery);

  const dom = render(<Toolbar />);

  const navElement = await waitFor(() =>
    queryByAttribute('id', dom.container, 'wpadminbar'),
  );

  expect(navElement).toBeInTheDocument();
});

test('renders a default list of nodes in the primary section if seedNode is not provided', async () => {
  expect.assertions(2);
  mockIsAuthenticated = true;
  const dom = render(<Toolbar />);
  await waitFor(() => queryByAttribute('id', dom.container, 'wpadminbar'));
  const toolBars = screen.getAllByRole('list', { name: /toolbar/i });
  // Primary Toolbar
  testToolBarNode(
    toolBars[0],
    3,
    `
  Array [
    "WordPress",
    "",
    "GraphiQL IDE",
  ]
`,
  );
});

test('renders an Edit Post Node,  in the primary section if seedNode is provided', async () => {
  expect.assertions(2);
  mockIsAuthenticated = true;
  const dom = render(
    <Toolbar seedNode={{ isFrontPage: false, __typename: 'Post' }} />,
  );
  await waitFor(() => queryByAttribute('id', dom.container, 'wpadminbar'));
  const toolBars = screen.getAllByRole('list', { name: /toolbar/i });
  // Primary Toolbar
  testToolBarNode(
    toolBars[0],
    3,
    `
  Array [
    "WordPress",
    "Edit Post",
    "GraphiQL IDE",
  ]
`,
  );
});

test('renders an Account Node in the secondary section', async () => {
  expect.assertions(2);
  mockIsAuthenticated = true;
  mockIsReady = true;
  const dom = render(
    <Toolbar seedNode={{ isFrontPage: false, __typename: 'Post' }} />,
  );
  await waitFor(() => queryByAttribute('id', dom.container, 'wpadminbar'));
  const toolBars = screen.getAllByRole('list', { name: /toolbar/i });
  // Secondary Toolbar
  testToolBarNode(
    toolBars[1],
    4,
    `
    Array [
      "Howdy, Edit ProfileLog Out",
      "",
      "Edit Profile",
      "Log Out",
    ]
  `,
  );
});

test('Uses `toolbarNodes` hook to add nodes', async () => {
  setConfig({
    // @ts-ignore
    templates: [],
    // @ts-ignore
    experimentalPlugins: [new TestAddToolbarNodePlugin()],
  });
  expect.assertions(2);
  mockIsAuthenticated = true;
  mockIsReady = true;
  const dom = render(
    <Toolbar seedNode={{ isFrontPage: false, __typename: 'Post' }} />,
  );
  await waitFor(() => queryByAttribute('id', dom.container, 'wpadminbar'));
  const toolBars = screen.getAllByRole('list', { name: /toolbar/i });
  // Secondary Toolbar
  testToolBarNode(
    toolBars[0],
    4,
    `
    Array [
      "WordPress",
      "Edit Post",
      "GraphiQL IDE",
      "Test Node",
    ]
  `,
  );
});

class TestAddToolbarNodePlugin {
  constructor() {}

  apply(hooks: Hooks) {
    hooks.addFilter(
      'toolbarNodes',
      'faust',
      (
        nodes: FaustToolbarNodes,
        ctx: { seedNode?: Record<string, string> },
      ) => {
        return [
          ...nodes,
          {
            id: 'test-node',
            location: 'primary',
            component: <div>Test Node</div>,
          },
        ];
      },
    );
  }
}

function testToolBarNode(
  toolBar: HTMLElement,
  expectedLen: number,
  expectedContent: string,
) {
  const { getAllByRole } = within(toolBar);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(expectedLen);
  const toolBarNames = items.map((item) => item.textContent);
  expect(toolBarNames).toMatchInlineSnapshot(expectedContent);
}
