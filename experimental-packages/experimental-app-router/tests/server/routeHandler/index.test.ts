import 'isomorphic-fetch';
import { NextRequest } from 'next/server';
import * as faustRouteHandler from '../../../src/server/routeHandler/index.js';
import * as tokenHandler from '../../../src/server/routeHandler/tokenHandler.js';
import * as nextNavigation from 'next/navigation.js';
jest.mock('next/navigation.js');

describe('faustRouteHandler', () => {
  it('Returns 404 if there are no matching endpoints', async () => {
    const notFoundSpy = jest
      .spyOn(nextNavigation, 'notFound')
      .mockImplementation();

    const request = new NextRequest(
      new Request('http://localhost:3000/api/faust/testing'),
    );

    const response = await faustRouteHandler.faustRouteHandler.GET(request);

    expect(notFoundSpy).toHaveBeenCalledTimes(1);
  });

  it('returns the token endpoint given the correct request url', async () => {
    const tokenHandlerSpy = jest
      .spyOn(tokenHandler, 'tokenHandler')
      .mockImplementation();

    const request = new NextRequest(
      new Request('http://localhost:3000/api/faust/token'),
    );

    const response = await faustRouteHandler.faustRouteHandler.GET(request);

    expect(tokenHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
