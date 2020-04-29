// 测试apis
import api from '@/plugins/api'
describe('plugins/api', () => {
  it('测试api结构', () => {
    Object.values(api).forEach((item) => {
      expect(typeof item).toBe('function')
    })
  })
})
