export default [
  {
    url: '/mockApi/api/menu',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: [
          {
            key: 'quark',
            name: '后台系统',
            subMenus: [
              {
                icon: 'fa-archive',
                name: '列表一',
                subMenus: [
                  { name: '商户信息管理', url: '/ops/merchant' },
                  { name: '地理信息管理', url: '/ops/city' },
                  { name: '城市管理', url: '/ops/cityService' },
                  { name: '自定义区域管理', url: '/ops/customServiceArea' }
                ]
              },
              {
                icon: 'fa-inbox',
                name: '列表二',
                subMenus: [
                  { name: '品牌管理', url: '/ops/goodsBrand' }
                ]
              }
            ]
          },
          {
            key: 'iframe',
            name: '外部系统',
            subMenus: [
              {
                icon: 'fa-archive',
                name: '列表一',
                subMenus: [
                  { name: '外部系统', url: 'http://localhost:8080/ops/merchant' }
                ]
              }
            ]
          }
        ],
        message: ''
      }
    }
  },
  {
    url: '/mockApi/api/me',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          id: 1,
          name: 'admin',
          phone: '138******999'
        },
        message: ''
      }
    }
  }
]
