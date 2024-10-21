import isString from 'lodash/isString.js';

/**
 * Returns whether or not the app execution context is currently Server-Side or Client-Side
 *
 * @export
 * @returns {boolean}
 */
export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

/**
 * Returns whether or not a string is a base64 encoded string
 *
 * @export
 * @param {string} str
 * @returns
 */
export function isBase64(str: string): boolean {
  if (!isString(str) || str.length === 0) {
    return false;
  }

  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(
    str.replace(/\n/g, ''),
  );
}

export const previewRegex = /\/preview(\/\w|\?)/;

export function isPreviewPath(uri: string): boolean {
  if (!isString(uri)) {
    return false;
  }

  return previewRegex.test(uri);
}

/**
 * Returns whether or not a string is a valid URL
 *
 * @export
 * @returns
 */
export function isValidUrl(url: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

/**
 * Returns whether or not a string is a valid email address
 *
 * @export
 * @returns
 */
export function isValidEmail(email: string): boolean {
  return emailRegex.test(String(email).toLowerCase());
}
