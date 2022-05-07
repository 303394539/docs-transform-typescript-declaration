import DeclaratioLoader, { DeclaratioLoaderOptions } from '../DeclaratioLoader';

import DeclaratioMappingClass from './DeclaratioMappingClass';
import DeclaratioCommentMappingClass from '../Swagger2Loader/DeclaratioCommentMappingClass';
import FieldsMappingClass from '../Swagger2Loader/FieldsMappingClass';
import FieldsCommentMappingClass from '../Swagger2Loader/FieldsCommentMappingClass';

export {
  DeclaratioMappingClass,
  DeclaratioCommentMappingClass,
  FieldsMappingClass,
  FieldsCommentMappingClass,
};

export default function Swagger3Loader(options?: DeclaratioLoaderOptions) {
  return new DeclaratioLoader({
    mapping: new DeclaratioMappingClass(),
    ...options,
  });
}
