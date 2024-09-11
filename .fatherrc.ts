import { defineConfig } from '@baic/father-plugin-yolk';

export default defineConfig({
  platform: 'node',
  prebundle: {
    deps: {
      mustache: {},
    },
  },
});
