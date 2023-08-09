/** @jest-environment jsdom */
import React from "react"
import registerFaustBlock from '../src/registerFaustBlock.js';

import { registerBlockType } from '@wordpress/blocks';
jest.mock('@wordpress/blocks');


describe('registerFaustBlock()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MyCustomBlock = () => {
    return <div>Hello</div>;
  };
  MyCustomBlock.config = {
    name: 'MyCustomBlock',
  };
  const blockJson = {
    name: 'my-plugin/my-custom-block',
    attributes: [],
    category: "text",
    title: 'MyCustomBlock'
  };
  it('calls registerBlockType passing the block.json metadata', () => {
    expect.assertions(1);
    registerFaustBlock(MyCustomBlock, { blockJson, editFn: () => null, saveFn: () => null });
    expect(registerBlockType).toHaveBeenCalledWith(blockJson.name, expect.objectContaining(blockJson));
  });
});
