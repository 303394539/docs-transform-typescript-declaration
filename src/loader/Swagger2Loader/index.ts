import DeclaratioLoader, { DeclaratioLoaderOptions } from '../DeclaratioLoader';
import DeclaratioCommentMappingClass from './DeclaratioCommentMappingClass';
import DeclaratioMappingClass from './DeclaratioMappingClass';
import FieldsCommentMappingClass from './FieldsCommentMappingClass';
import FieldsMappingClass from './FieldsMappingClass';

export {
  DeclaratioCommentMappingClass,
  DeclaratioMappingClass,
  FieldsCommentMappingClass,
  FieldsMappingClass,
};

export default function Swagger2Loader(options?: DeclaratioLoaderOptions) {
  return new DeclaratioLoader({
    mapping: new DeclaratioMappingClass(),
    ...options,
  });
}
