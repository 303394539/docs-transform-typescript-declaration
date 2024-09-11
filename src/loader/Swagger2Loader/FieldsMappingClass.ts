import { clearInvalidStr, isCn } from '../../_utils';
import type { FieldMapping } from '../../mapping';
import { Keys, MappingValues, Values } from '../../mapping';
import FieldsCommentMappingClass from './FieldsCommentMappingClass';

@MappingValues('properties')
export default class FieldMappingClass implements FieldMapping {
  @Keys()
  name(value?: string) {
    return value || '';
  }

  @Values()
  type(value?: any) {
    const { type, originalRef, items } = value || {};
    const $type = clearInvalidStr(type || originalRef);
    if (!$type || isCn($type)) {
      return 'any';
    }
    if ('integer' === $type) {
      return 'string';
    }
    if ('array' === $type) {
      if (items) {
        const { originalRef: oRef, type: t } = items;
        if (oRef) {
          return `${clearInvalidStr(oRef)}[]`;
        }
        if (t) {
          if ('integer' === t) {
            return 'string[]';
          }
          return `${t}[]`;
        }
      }
      return 'any[]';
    }
    return $type;
  }

  commentMapping = new FieldsCommentMappingClass();
}
