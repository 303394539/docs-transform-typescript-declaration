import _ from 'lodash';

export function clearInvalidStr(value: string) {
  return _.isString(value) ? value.replace(/«|»|_|,/gu, '') : '';
}

export function isCn(value: string) {
  return _.isString(value) ? /[\u4e00-\u9fa5]/u.test(value) : false;
}
