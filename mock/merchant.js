const obj = {'aa': '11', 'bb': '22', 'cc': '33', 'dd': '44'}

export default [
  {
    url: '/mockApi/mdds/merchant/init',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: '列表页面初始化成功！',
        data: {
          merchantTypeList: [
            { id: 0, value: '自营' },
            { id: 1, value: '第三方' }
          ],
          invoicingAllowedEnumList: [
            { id: 1, value: '允许' },
            { id: 0, value: '不允许' }
          ]
        }
      }
    }
  },
  {
    url: '/mockApi/mdds/merchant/page',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: '列表数据获取成功！',
        'data|20': [ // 随机生成1到3个数组元素
          {
            'name': '@cname', // 中文名称
            'id|+1': 1, // 属性值自动加 1，初始值为88
            'age|18-28': 0, // 18至28以内随机整数, 0只是用来确定类型
            'birthday': '@date("yyyy-MM-dd")', // 日期
            'city': '@city(true)', // 中国城市
            'color': '@color', // 16进制颜色
            'isMale|1': true, // 布尔值
            'isFat|1-2': true, // true的概率是1/3
            'fromObj|2': obj, // 从obj对象中随机获取2个属性
            'fromObj2|1-3': obj, // 从obj对象中随机获取1至3个属性
            'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
            'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
            'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
          }]
      }
    }
  }
]
