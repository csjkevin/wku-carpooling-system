import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/order',
      routes: [
        { path: '/order', component: '@/pages/Order' },
        { path: '/order/new', component: '@/pages/Order/New' },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
