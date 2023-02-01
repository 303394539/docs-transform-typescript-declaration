import _ from 'lodash';

import { CommentMapping, MappingValues, Value } from '../../mapping';

@MappingValues()
export default class FieldCommentMappingClass implements CommentMapping {
  @Value('description')
  description(value?: string) {
    return value || '';
  }

  @Value('example')
  example(value?: string) {
    return value || '';
  }

  @Value('enum')
  enum(value?: any) {
    return _.isString(value) ? value : JSON.stringify(value);
  }

  @Value('default')
  default(value?: string) {
    return value || '';
  }
}
