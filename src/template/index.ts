export declare type Struct = 'interface' | 'type';

/**
 * @description 声明的Comment结构
 */
export declare type Comment = {
  deprecated?: string;
  description?: string;
  example?: string;
  default?: string;
  enum?: string;
  link?: string | string[];
};

/**
 * @description 声明的Field结构
 */
export declare type Field = {
  name?: string;
  type?: string;
  required?: boolean;
  comment?: Comment;
};

/**
 * @description 声明的结构
 */
export declare type Declaration = {
  comment?: Comment;
  export?: boolean;
  name?: string;
  struct?: Struct;
  fields?: Field[];
  isTypeStruct?: boolean;
};

/**
 * @description 模版的结构
 */
export declare type Template = {
  declarations?: Declaration[];
  before?: string;
  after?: string;
};
