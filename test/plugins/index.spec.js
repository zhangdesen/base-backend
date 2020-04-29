import { install } from '@/plugins/index'
describe('plugins/index', () => {
  it('测试install函数', () => {
    expect(install.hasOwnProperty('install')).toBe(true)
  })
})
