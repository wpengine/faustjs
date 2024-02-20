import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import isString from 'lodash/isString.js';
import cookie, { CookieSerializeOptions } from 'cookie';
import { base64Decode, base64Encode } from '../../utils/index.js';

export interface CookieOptions {
  encoded?: boolean;
  isJson?: boolean;
}

/**
 * Merge cookies from current Set-Cookie header with a new cookie string.
 *
 * @param setCookieHeader Current Set-Cookie header if exists.
 * @param newCookie The new cookie string to be applied.
 * @returns A cookie string or array of cookie strings.
 */
export function mergeCookies(
  setCookieHeader: string | string[] | number | undefined,
  newCookie: string,
) {
  // If there is no setCookieHeader, return the newCookie early.
  if (!setCookieHeader) {
    return newCookie;
  }

  /**
   * If there is already a Set-Cookie header, create an array and merge
   * the existing ones with the new cookie.
   */
  let newCookies: string[] = [];
  if (Array.isArray(setCookieHeader)) {
    newCookies = [...setCookieHeader];
  } else {
    newCookies = [setCookieHeader as string];
  }

  newCookies = [...newCookies, newCookie];

  return newCookies;
}

export class Cookies {
  private request: IncomingMessage;

  private response?: ServerResponse;

  private cookies: Record<string, string> = {};

  constructor(req: IncomingMessage, res?: ServerResponse) {
    this.request = req;
    this.response = res;

    this.cookies = cookie.parse(this.request.headers.cookie || '');
  }

  public getCookie(
    key: string,
    options: CookieOptions & { isJson: true },
  ): any | undefined;
  public getCookie(key: string, options?: CookieOptions): string | undefined;
  public getCookie(
    key: string,
    { encoded = true, isJson = false }: CookieOptions = {},
  ): string | any | undefined {
    const value = this.cookies[key];

    if (!isString(value)) {
      return;
    }

    const valueStr = encoded ? base64Decode(value) : value;

    // eslint-disable-next-line consistent-return
    return isJson ? JSON.parse(valueStr) : valueStr;
  }

  public setCookie(
    key: string,
    value: string | Record<string, unknown>,
    {
      encoded = true,
      isJson = false,
      ...serializeOptions
    }: CookieOptions & CookieSerializeOptions = {},
  ): void {
    const valueStr = isJson ? JSON.stringify(value) : (value as string);
    const cookieValue = encoded ? base64Encode(valueStr) : valueStr;

    this.cookies[key] = cookieValue;

    const existingCookieHeader = this.response?.getHeader('Set-Cookie');

    const newCookies = mergeCookies(
      existingCookieHeader,
      cookie.serialize(key, cookieValue, serializeOptions),
    );

    this.response?.setHeader('Set-Cookie', newCookies);
  }
}
