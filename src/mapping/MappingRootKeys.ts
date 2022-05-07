import RootKeys from './RootKeys';

/**
 * @description 提取数据从根起的指定属性的key数组给mapping
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function MappingRootKey(...args: string[]) {
  return function decorator<T extends { new (..._args: any[]): {} }>(
    constructor: T,
  ) {
    const { value = {} } = RootKeys(...args)({}, '', {});
    return class extends constructor {
      pickData = value.pickData;
    };
  };
}
