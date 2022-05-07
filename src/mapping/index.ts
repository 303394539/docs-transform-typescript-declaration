import { Declaration, Comment, Field } from '../template';

export interface MappingObject {
  pickData?: (obj: any, data: any) => any;
}

type Mapping<Result = any> = MappingObject & {
  [K in keyof Result]: ((...args: any[]) => Result[K]) & MappingObject;
};

export declare type CommentMapping = Mapping<Comment>;

export declare type FieldMapping = Mapping<Omit<Field, 'comment'>> & {
  commentMapping?: CommentMapping;
};

export declare type DeclaratioMapping = Mapping<
  Omit<Declaration, 'comment' | 'fields'>
> & {
  commentMapping?: CommentMapping;
  fieldsMapping?: FieldMapping;
};

export { default as Value } from './Value';

export { default as Values } from './Values';

export { default as Keys } from './Keys';

export { default as RootValue } from './RootValue';

export { default as RootValues } from './RootValues';

export { default as RootKeys } from './RootKeys';

export { default as MappingValue } from './MappingValue';

export { default as MappingValues } from './MappingValues';

export { default as MappingKeys } from './MappingKeys';

export { default as MappingRootValue } from './MappingRootValue';

export { default as MappingRootValues } from './MappingRootValues';

export { default as MappingRootKeys } from './MappingRootKeys';
