import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import isString from 'lodash/isString.js';
import cookie, { CookieSerializeOptions } from 'cookie';
import { base64Decode, base64Encode } from '../../utils/index.js';

export interface CookieOptions {
  encoded?: boolean;
  isJson?: boolean;
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

    this.response?.setHeader(
      'Set-Cookie',
      cookie.serialize(key, cookieValue, serializeOptions),
    );
  }

  public removeCookie(key: string): void {
    delete this.cookies[key];

    this.response?.setHeader(
      'Set-Cookie',
      cookie.serialize(key, '', {
        expires: new Date(0),
      }),
    );
  }
}
