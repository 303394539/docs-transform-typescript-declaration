import fs from 'fs';
import path from 'path';
import mustache from 'mustache';
import rimraf from 'rimraf';
import { format } from 'prettier';

import _ from 'lodash';

import { Swagger2Loader, Swagger3Loader } from '..';

import { TEMPLATE_FILE_PATH } from '../constants';

test('template', () => {
  const content = format(
    mustache.render(fs.readFileSync(TEMPLATE_FILE_PATH, 'utf-8'), {
      declarations: [
        {
          comment: {
            description: 'string',
            link: ['string'],
          },
          name: 'Dto1',
          export: true,
          struct: 'interface',
          fields: [
            {
              name: 'name',
              type: 'string',
              required: true,
              comment: {
                deprecated: 'string',
                description: 'string',
                example: 'string',
                default: 'string',
                enum: 'string',
              },
            },
          ],
        },
        {
          name: 'Dto2',
          struct: 'type',
          isTypeStruct: true,
          fields: [
            {
              name: 'name',
              type: 'string',
            },
          ],
        },
      ],
    }),
    {
      parser: 'typescript',
    },
  );
  expect(content).toEqual(
    format(
      `/**
        * @description string
        * @link string
        */
        export interface Dto1 {
          /**
           * @description string
           * @enum string
           * @example string
           * @default string
           * @deprecated string
          */
          name: string;
        }
        declare type Dto2 = {
          name?: string;
        }
      `,
      { parser: 'typescript' },
    ),
  );
});

test('Swagger2Loader', async () => {
  await Swagger2Loader({
    name: 'swagger2',
    outputPath: 'src/__test__',
    template: {
      filePath: TEMPLATE_FILE_PATH,
    },
    dataLoader: async () => {
      const data = fs.readFileSync(
        path.join(process.cwd(), 'src', '__test__', 'swagger2.test.json'),
        'utf-8',
      );
      if (_.isString(data)) {
        return JSON.parse(data);
      }
      return data;
    },
  }).run();
  const filePath = path.join(process.cwd(), 'src', '__test__', 'swagger2.d.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  expect(content).toEqual(
    format(
      `export interface Dto1 {
        /**
         * @description description
         * @enum ["A"]
         */
        field1?: string;
        /**
         * @description description
         */
        field2?: Dto2;
        fields?: Dto2[];
      }
      /**
       * @link /dto2
       */
      export interface Dto2 {}
      `,
      { parser: 'typescript' },
    ),
  );
  rimraf(
    path.join(process.cwd(), 'src', '__test__', 'swagger2.d.ts'),
    () => {},
  );
});

test('Swagger3Loader', async () => {
  await Swagger3Loader({
    name: 'swagger3',
    outputPath: 'src/__test__',
    template: {
      before: 'type Before = {};',
      filePath: TEMPLATE_FILE_PATH,
      after: 'type After = {};',
    },
    dataLoader: async () => {
      const data = fs.readFileSync(
        path.join(process.cwd(), 'src', '__test__', 'swagger3.test.json'),
        'utf-8',
      );
      if (_.isString(data)) {
        return JSON.parse(data);
      }
      return data;
    },
  }).run();
  const filePath = path.join(process.cwd(), 'src', '__test__', 'swagger3.d.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  expect(content).toEqual(
    format(
      `
      type Before = {};
      export interface Dto1 {
        /**
         * @description description
         * @enum ["A"]
         */
        field1?: string;
        /**
         * @description description
         */
        field2?: Dto2;
        fields?: Dto2[];
      }
      /**
       * @link /dto2
       * @link /dto2List
       */
      export interface Dto2 {}
      type After = {};
      `,
      { parser: 'typescript' },
    ),
  );
  rimraf(
    path.join(process.cwd(), 'src', '__test__', 'swagger3.d.ts'),
    () => {},
  );
});
