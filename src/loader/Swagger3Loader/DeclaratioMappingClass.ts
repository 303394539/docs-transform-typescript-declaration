import { MappingRootValue, Values } from '../../mapping';

import Swagger2DeclaratioMappingClass from '../Swagger2Loader/DeclaratioMappingClass';

import DeclaratioCommentMappingClass from './DeclaratioCommentMappingClass';

const swagger2DeclaratioMappingClass = new Swagger2DeclaratioMappingClass();

@MappingRootValue('components.schemas')
export default class DeclaratioMappingClass extends Swagger2DeclaratioMappingClass {
  @Values('xml.name')
  name(value?: string) {
    return swagger2DeclaratioMappingClass.name(value);
  }

  commentMapping = new DeclaratioCommentMappingClass();
}
