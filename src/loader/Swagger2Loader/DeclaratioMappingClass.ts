import { MappingRootValue, Values, DeclaratioMapping } from '../../mapping';

import DeclaratioCommentMappingClass from './DeclaratioCommentMappingClass';

import FieldsMappingClass from './FieldsMappingClass';

import { clearInvalidStr, isCn } from '../../_utils';

@MappingRootValue('definitions')
export default class DeclaratioMappingClass implements DeclaratioMapping {
  @Values('title')
  name(value?: string) {
    if (!value || isCn(value)) {
      return '';
    }
    return clearInvalidStr(value);
  }

  commentMapping = new DeclaratioCommentMappingClass();

  fieldsMapping = new FieldsMappingClass();
}
