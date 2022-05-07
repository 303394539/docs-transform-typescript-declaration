import _ from 'lodash';

import Value from './Value';

/**
 * @description 提取数据的指定属性的value数组给mapping的方法
 * @param 提取的属性的路径，传入多个为有值优先匹配
 */
export default function Values(...args: string[]) {
  return function decorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const { value: originValue = {} } = descriptor;
    originValue.pickData = (data: any) => {
      let res = [];
      if (!_.isNil(data) && !_.isArray(data)) {
        res = _.values(data);
        if (args.length) {
          const { value: $value } = Value(...args)(target, propertyKey, {});
          res = res.map((item) => $value.pickData(item));
        }
      }
      return res;
    };
    return {
      ...descriptor,
      value: originValue,
    };
  };
}
