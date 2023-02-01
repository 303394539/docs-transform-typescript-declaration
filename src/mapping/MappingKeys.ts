import Keys from './Keys';

/**
 * @description 提取数据的指定属性的key数组给mapping
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function MappingValue(...args: string[]) {
  return function decorator<
    T extends { new (..._args: any[]): Record<string, any> },
  >(constructor: T) {
    const { value = {} } = Keys(...args)({}, '', {});
    return class extends constructor {
      pickData = value.pickData;
    };
  };
}
