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
        get(value[link], `post.${originalRefPath}`, {}),
      );
      const $ref: string = get(
        value[link],
        `get.${$refPath}`,
        get(value[link], `post.${$refPath}`, {}),
      );
      if (
        clearInvalidStr(originalRef) === name ||
        $ref?.lastIndexOf(name) === 0
      ) {
        links.push(link);
      }
    });
    return links;
  }
}
