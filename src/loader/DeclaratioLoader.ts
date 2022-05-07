import _ from 'lodash';

import fs from 'fs';

import path from 'path';

import mustache from 'mustache';

import { format } from 'prettier';

import { TEMPLATE_FILE_PATH } from '../constants';

import { Template, Declaration, Comment, Field, Struct } from '../template';

import {
  DeclaratioMapping,
  CommentMapping,
  FieldMapping,
  MappingObject,
} from '../mapping';

export interface DeclaratioLoaderOptions {
  /**
   * @description 类型文件的后缀
   * @default d.ts
   */
  suffix?: string;
  /**
   * @description 类型文件的名称
   * @default types
   */
  name?: string;
  /**
   * @description 类型文件生成地址
   * @default src
   */
  outputPath?: string;
  /**
   * @description 类型结构
   * @default interface
   */
  struct?: Struct;
  /**
   * @description template模版配置，mustache模版
   */
  template?: {
    /**
     * @description 模版地址
     */
    filePath?: string;
    /**
     * @description 生成文件前内容
     */
    before?: Template['before'];
    /**
     * @description 生产文件后内容
     */
    after?: Template['after'];
  };
  /**
   * @description 加载数据
   */
  dataLoader?: () => Promise<any> | any;
  /**
   * @description 生成规则
   */
  mapping?: DeclaratioMapping;
}

function getMappingData(mappingObject?: MappingObject, obj?: any, data?: any) {
  if (mappingObject) {
    const { pickData } = mappingObject;
    if (_.isFunction(pickData)) {
      return pickData(obj, data);
    }
  }
  return obj;
}

function commentFactory(
  mapping: CommentMapping,
  node: any,
  obj: any,
  data: any,
): Comment | undefined {
  const comment: Comment = {};
  const {
    deprecated,
    description,
    example,
    default: mappingDefault,
    enum: mappingEnum,
    link,
  } = mapping;
  if (_.isFunction(deprecated)) {
    comment.deprecated = deprecated(
      getMappingData(deprecated, obj, data),
      node,
      obj,
      data,
    );
  }
  if (_.isFunction(description)) {
    comment.description = description(
      getMappingData(description, obj, data),
      node,
      obj,
      data,
    );
  }
  if (_.isFunction(example)) {
    comment.example = example(
      getMappingData(example, obj, data),
      node,
      obj,
      data,
    );
  }
  if (_.isFunction(mappingDefault)) {
    comment.default = mappingDefault(
      getMappingData(mappingDefault, obj, data),
      node,
      obj,
      data,
    );
  }
  if (_.isFunction(mappingEnum)) {
    comment.enum = mappingEnum(
      getMappingData(mappingEnum, obj, data),
      node,
      obj,
      data,
    );
  }
  if (_.isFunction(link)) {
    comment.link = link(getMappingData(link, obj, data), node, obj, data);
  }
  return _.compact(
    _.values(comment).filter((item) =>
      _.isArray(item) ? item.length : !!item,
    ),
  ).length
    ? comment
    : undefined;
}

function fieldsFactory(
  mapping: FieldMapping,
  node: any,
  obj: any,
  data: any,
): Declaration['fields'] {
  const fields: Declaration['fields'] = [];
  const { name, required, type, commentMapping } = mapping;
  const nameData = getMappingData(name, obj, data);
  const requiredData = getMappingData(required, obj, data);
  const typeData = getMappingData(type, obj, data);
  const commentData = getMappingData(commentMapping, obj, data);
  (_.isArray(nameData) ? nameData : [nameData]).forEach(
    (item: any, index: number) => {
      const field: Field = {};
      if (_.isFunction(name)) {
        field.name = name(item, node, obj, data);
      }
      if (_.isFunction(type) && typeData) {
        field.type = type(
          _.isArray(typeData) ? typeData[index] : typeData,
          node,
          obj,
          data,
        );
      }
      if (field.name && field.type) {
        if (_.isFunction(required) && requiredData) {
          field.required = required(
            _.isArray(requiredData) ? requiredData[index] : requiredData,
            node,
            obj,
            data,
          );
        }
        if (commentMapping && commentData) {
          field.comment = commentFactory(
            commentMapping,
            field,
            _.isArray(commentData) ? commentData[index] : commentData,
            data,
          );
        }
        fields.push(field);
      }
    },
  );
  return fields;
}

function declarationFactory(
  mapping: DeclaratioMapping,
  data: any,
  struct?: Struct,
): Declaration[] {
  const declarations: Declaration[] = [];
  if (mapping) {
    const {
      name: mappingName,
      export: mappingExport,
      struct: mappingStruct,
      commentMapping,
      fieldsMapping,
    } = mapping;
    const mappingData = getMappingData(mapping, data, data);
    const nameData = getMappingData(mappingName, mappingData, data);
    const exportData = getMappingData(mappingExport, mappingData, data);
    let structData: any;
    if (_.isFunction(mappingStruct)) {
      structData = getMappingData(mappingStruct, mappingData, data);
    }
    const commentData = getMappingData(commentMapping, mappingData, data);
    const fieldsData = getMappingData(fieldsMapping, mappingData, data);
    (_.isArray(nameData) ? nameData : [nameData]).forEach(
      (item: any, index: number) => {
        const intf: Declaration = {
          export: true,
          struct: struct || 'interface',
          isTypeStruct: false,
        };
        if (_.isFunction(mappingName)) {
          intf.name = mappingName(item, data);
        }
        if (intf.name) {
          if (_.isFunction(mappingExport) && exportData) {
            intf.export = mappingExport(
              _.isArray(exportData) ? exportData[index] : exportData,
              data,
            );
          }
          if (_.isFunction(mappingStruct) && structData) {
            intf.struct = mappingStruct(
              _.isArray(structData) ? structData[index] : structData,
              data,
            );
            if ('type' === intf.struct) {
              intf.isTypeStruct = true;
            }
          }
          if (commentMapping && commentData) {
            intf.comment = commentFactory(
              commentMapping,
              intf,
              _.isArray(commentData) ? commentData[index] : commentData,
              data,
            );
          }
          if (fieldsMapping && fieldsData) {
            intf.fields = fieldsFactory(
              fieldsMapping,
              intf,
              _.isArray(fieldsData) ? fieldsData[index] : fieldsData,
              data,
            );
          }
          declarations.push(intf);
        }
      },
    );
  }
  return declarations;
}

export default class DeclaratioLoader {
  private options: DeclaratioLoaderOptions = {
    suffix: 'd.ts',
    name: 'types',
    outputPath: 'src',
    dataLoader: () => ({}),
    mapping: {},
  };

  constructor(options?: DeclaratioLoaderOptions) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  public async run() {
    const {
      dataLoader,
      mapping,
      struct,
      name,
      suffix,
      outputPath = 'src',
      template,
    } = this.options;
    const {
      filePath: templateFilePath,
      before = '',
      after = '',
    } = template || {};
    let data;
    if (_.isFunction(dataLoader)) {
      data = await dataLoader();
    }
    if (data) {
      const declarations = declarationFactory(mapping || {}, data, struct);
      const content = format(
        mustache.render(
          fs.readFileSync(templateFilePath || TEMPLATE_FILE_PATH, 'utf-8'),
          {
            declarations,
            before,
            after,
          } as Template,
        ),
        {
          parser: 'typescript',
        },
      );
      const fileName = `${name}.${suffix}`;
      const filePath = path.join(process.cwd(), outputPath, fileName);
      fs.writeFileSync(filePath, content, 'utf-8');
      return {
        content,
        fileName,
        filePath,
      };
    }
    return {};
  }
}
