import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/order',
      component: '@/layouts/AuthLayout',
      routes: [
        { path: '/order', component: '@/pages/Order' },
        { path: '/order/new', component: '@/pages/Order/New' },
      ],
    },
    {
      path: '/register',
      component: '@/pages/Register',
    },
    {
      path: '/login',
      component: '@/pages/Login',
    },
    {
      path: '/verify',
      component: '@/pages/Verify',
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
