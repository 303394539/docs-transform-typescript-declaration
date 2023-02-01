import Values from './Values';

/**
 * @description 提取数据的指定属性的value数组给mapping
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function MappingValues(...args: string[]) {
  return function decorator<
    T extends { new (..._args: any[]): Record<string, any> },
  >(constructor: T) {
    const { value = {} } = Values(...args)({}, '', {});
    return class extends constructor {
      pickData = value.pickData;
    };
  };
}
