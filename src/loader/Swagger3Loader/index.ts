import DeclaratioLoader, { DeclaratioLoaderOptions } from '../DeclaratioLoader';
import DeclaratioCommentMappingClass from '../Swagger2Loader/DeclaratioCommentMappingClass';
import FieldsCommentMappingClass from '../Swagger2Loader/FieldsCommentMappingClass';
import FieldsMappingClass from '../Swagger2Loader/FieldsMappingClass';
import DeclaratioMappingClass from './DeclaratioMappingClass';

export {
  DeclaratioCommentMappingClass,
  DeclaratioMappingClass,
  FieldsCommentMappingClass,
  FieldsMappingClass,
};

export default function Swagger3Loader(options?: DeclaratioLoaderOptions) {
  return new DeclaratioLoader({
    mapping: new DeclaratioMappingClass(),
    ...options,
  });
}
