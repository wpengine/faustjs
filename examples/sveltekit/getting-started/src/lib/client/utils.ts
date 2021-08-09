import isObject from 'lodash/isObject.js';
import isString from 'lodash/isString.js';

function hasPropString(prop) {
  return (params) => {
    return isObject(params) && isString(params[prop]);
  };
}

export const hasPostId = hasPropString('postId');
export const hasPostSlug = hasPropString('postSlug');
export const hasPostUri = hasPropString('postUri');

export const hasPageId = hasPropString('pageId');
export const hasPageUri = hasPropString('pageUri');

export const hasCategoryId = hasPropString('categoryId');
export const hasCategorySlug = hasPropString('categorySlug');
