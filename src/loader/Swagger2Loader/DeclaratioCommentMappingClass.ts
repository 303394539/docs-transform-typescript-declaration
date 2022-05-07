import _ from 'lodash';

import { RootValue, CommentMapping } from '../../mapping';

import { clearInvalidStr } from '../../_utils';

export default class DeclaratioCommentMappingClass implements CommentMapping {
  @RootValue('paths')
  link(value: any, node: any) {
    const { name } = node;
    const links: string[] = [];
    _.keys(value).forEach((link) => {
      const dataPath = 'responses.200.schema.originalRef';
      const originalRef = _.get(
        value[link],
        `get.${dataPath}`,
        _.get(value[link], `post.${dataPath}`, {}),
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
