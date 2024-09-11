import { isString } from 'lodash';

export function clearInvalidStr(value: string) {
  return isString(value) ? value.replace(/«|»|_|,/gu, '') : '';
}

export function isCn(value: string) {
  return isString(value) ? /[\u4e00-\u9fa5]/u.test(value) : false;
}
