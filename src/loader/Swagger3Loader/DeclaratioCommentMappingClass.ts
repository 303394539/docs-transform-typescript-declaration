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
      const dataPath = 'responses.200.content.application/json.schema';
      const schema = get(
        value[link],
        `get.${dataPath}`,
        get(value[link], `post.${dataPath}`, {}),
      );
      const ref = (
        schema.$ref || (schema.items ? schema.items.$ref || '' : '')
      ).split('/');
      if (clearInvalidStr(ref[ref.length - 1]) === name) {
        links.push(link);
      }
    });
    return links;
  }
}
