import Values from './Values';

/**
 * @description 提取数据从根起的指定属性的value数组给mapping的方法
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function RootValues(...args: string[]) {
  return function decorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const { value: originValue = {}, ...more } = Values(...args)(
      target,
      propertyKey,
      descriptor,
    );
    const { pickData } = originValue;
    originValue.pickData = (obj: any, root: any) => pickData(root);
    return {
      ...more,
      value: originValue,
    };
  };
}
