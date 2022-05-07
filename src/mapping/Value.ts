import _ from 'lodash';

/**
 * @description 提取数据的指定属性给mapping的方法
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function Value(...args: string[]) {
  return function decorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const { value: originValue = {} } = descriptor;
    originValue.pickData = (data: any) => {
      if (0 === args.length) {
        return data;
      }
      let res: any;
      args.forEach((arg: string) => {
        if (_.isNil(res)) {
          res = _.get(data, arg);
        }
      });
      return res;
    };
    return {
      ...descriptor,
      value: originValue,
    };
  };
}
