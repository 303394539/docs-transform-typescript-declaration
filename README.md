# docs-transform-typescript-declaration

#### 用于 Typescript 开发中，通过 node 根据后端接口文档生成声明文件

### 安装

```shell
npm install @baic/docs-transform-typescript-declaration
```

### 定义转换

#### 通过实现文档数据与模版的 mapping，实现自定义转换的 Loader，达到从文档数据转换为声明文件。具体参考 loader/Swagger2Loader。如果需要在 Swagger2 基础上再次定制，请参考 loader/Swagger3Loader

### 转换 Swagger2

```typescript
import { Swagger2Loader } from '@baic/docs-transform-typescript-declaration';

// 默认生成src/types.d.ts声明文件
Swagger2Loader({
  // dataLoader: async () => {
  //   const data = {}; // Swagger2的文档数据
  //   return data;
  // },
}).run();
```

### 转换 Swagger3

```typescript
import { Swagger3Loader } from '@baic/docs-transform-typescript-declaration';

// 默认生成src/types.d.ts声明文件
Swagger3Loader({
  // dataLoader: async () => {
  //   const data = {}; // Swagger3的文档数据
  //   return data;
  // },
}).run();
```
