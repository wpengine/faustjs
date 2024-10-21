/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useCheckFaustContext } from '../src/gqty/hooks/useCheckFaustContext';
import { FaustContextType } from '../src/gqty';

describe('useCheckFaustContext hook', () => {
  afterEach(() => {
    cleanup();
  });
  it("should error if a client instance can't be found in the context", () => {
    const context = React.createContext<FaustContextType>({});
    function App() {
      expect(() => useCheckFaustContext(context)).toThrow(Error);
      return null;
    }

    render(<App />);
  });
});
