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
      const schemaPath = 'responses.200.content.*/*.schema';
      const jsonSchemaPath = 'responses.200.content.application/json.schema';
      const schema = get(
        value[link],
        `get.${jsonSchemaPath}`,
        get(
          value[link],
          `post.${jsonSchemaPath}`,
          get(
            value[link],
            `get.${schemaPath}`,
            get(value[link], `post.${schemaPath}`),
          ),
        ),
      );
      const refArr = (
        schema.$ref || (schema.items ? schema.items.$ref || '' : '')
      )?.split('/');
      if (clearInvalidStr(refArr?.[refArr.length - 1]) === name) {
        links.push(link);
      }
    });
    return links;
  }
}
