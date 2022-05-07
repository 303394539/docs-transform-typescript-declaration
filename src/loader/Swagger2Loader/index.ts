import DeclaratioLoader, { DeclaratioLoaderOptions } from '../DeclaratioLoader';

import DeclaratioMappingClass from './DeclaratioMappingClass';
import DeclaratioCommentMappingClass from './DeclaratioCommentMappingClass';
import FieldsMappingClass from './FieldsMappingClass';
import FieldsCommentMappingClass from './FieldsCommentMappingClass';

export {
  DeclaratioMappingClass,
  DeclaratioCommentMappingClass,
  FieldsMappingClass,
  FieldsCommentMappingClass,
};

export default function Swagger2Loader(options?: DeclaratioLoaderOptions) {
  return new DeclaratioLoader({
    mapping: new DeclaratioMappingClass(),
    ...options,
  });
}
