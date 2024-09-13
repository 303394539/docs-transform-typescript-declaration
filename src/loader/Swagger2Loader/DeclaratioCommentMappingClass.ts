import { get, keys } from 'lodash';

import { clearInvalidStr } from '../../_utils';
import type { CommentMapping } from '../../mapping';
import { RootValue } from '../../mapping';

export default class DeclaratioCommentMappingClass implements CommentMapping {
  @RootValue('paths')
  link(value: any, node: any) {
    const { name } = node;
    const links: string[] = [];
    keys(value).forEach((link) => {
      const originalRefPath = 'responses.200.schema.originalRef';
      const $refPath = 'responses.200.schema.$ref';
      const originalRef: string = get(
        value[link],
        `get.${originalRefPath}`,
        get(value[link], `post.${originalRefPath}`),
      );
      const $refArr: string = get(
        value[link],
        `get.${$refPath}`,
        get(value[link], `post.${$refPath}`),
      )?.split('/');
      if (
        clearInvalidStr(originalRef) === name ||
        clearInvalidStr($refArr?.[$refArr.length - 1]) === name
      ) {
        links.push(link);
      }
    });
    return links;
  }
}
