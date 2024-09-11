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
      const dataPath = 'responses.200.schema.originalRef';
      const originalRef = get(
        value[link],
        `get.${dataPath}`,
        get(value[link], `post.${dataPath}`, {}),
      );
      if (originalRef) {
        if (clearInvalidStr(originalRef) === name) {
          links.push(link);
        }
      }
    });
    return links;
  }
}
