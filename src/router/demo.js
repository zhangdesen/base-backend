const demo = [
  {
    path: '/ops/merchant',
    name: 'Merchant',
    component: resolve => require(['@/pages/demo/merchant'], resolve),
    meta: {
      title: '商户信息管理', // 页面标题
      keepAlive: true // 是否缓存页面
    }
  },
  {
    path: '/ops/city',
    name: 'City',
    component: resolve => require(['@/pages/demo/city'], resolve),
    meta: {
      title: '地理信息管理', // 页面标题
      keepAlive: true, // 是否缓存页面
      enterPermission: ['quark:area:read'],
      pagePermission: [
        'quark:area:read',
        'quark:area:update',
        'quark:area:create'
      ]
    }
  },
  {
    path: '/ops/cityService',
    name: 'CityService',
    component: resolve => require(['@/pages/demo/cityService'], resolve),
    meta: {
      title: '城市管理', // 页面标题
      keepAlive: false // 是否缓存页面
    }
  },
  {
    path: '/ops/customServiceArea',
    name: 'CustomServiceArea',
    component: resolve => require(['@/pages/demo/customServiceArea'], resolve),
    meta: {
      title: '自定义区域管理', // 页面标题
      keepAlive: true // 是否缓存页面
    }
  },
  {
    path: '/ops/goodsBrand',
    name: 'goodsBrand',
    component: resolve => require(['@/pages/demo/goodsBrand'], resolve),
    meta: {
      title: '品牌管理',
      keepAlive: true,
      enterPermission: ['quark:brand:read'],
      pagePermission: [
        'quark:brand:read',
        'quark:brand:create',
        'quark:brand:updateStatus',
        'quark:brand:update',
        'quark:brand:delete',
        'quark:spu:cleanCache'
      ]
    }
  },
  {
    path: '/ops/merchant/create',
    name: 'MerchantCreate',
    component: resolve => require(['@/pages/demo/merchant/children/create'], resolve),
    meta: {
      title: '创建商户',
      keepAlive: true
    }
  },
  {
    path: '/ops/merchant/see',
    name: 'MerchantSee',
    component: resolve => require(['@/pages/demo/merchant/children/see'], resolve),
    meta: {
      title: '查看商户',
      keepAlive: true
    }
  },
  {
    path: '/ops/merchant/edit',
    name: 'MerchantEdit',
    component: resolve => require(['@/pages/demo/merchant/children/edit'], resolve),
    meta: {
      title: '编辑商户',
      keepAlive: true
    }
  }
]

export default demo
