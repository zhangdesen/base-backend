import apis from '@/service/apis'
describe('service/apis', () => {
  describe('测试service/apis结构', () => {
    // apis的结构
    it('必须的name', () => {
      apis.forEach(item => {
        expect(typeof item.name).toBe('string')
      })
    })
    it('正确的URL', () => {
      // ...
    })
    // ...
  })
})
