import RootValues from './RootValues';

/**
 * @description 提取数据从根起的指定属性的value数组给mapping
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function MappingRootValues(...args: string[]) {
  return function decorator<
    T extends { new (..._args: any[]): Record<string, any> },
  >(constructor: T) {
    const { value = {} } = RootValues(...args)({}, '', {});
    return class extends constructor {
      pickData = value.pickData;
    };
  };
}
