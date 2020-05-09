import moment from 'moment'

// 单个时间选择器选择最近时间
export const pickerOptions = {
  shortcuts: [
    {
      text: '昨日',
      onClick (picker) {
        const start = moment().subtract(1, 'days').startOf('day')
        const end = moment().subtract(1, 'days').endOf('day')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '今日',
      onClick (picker) {
        const start = moment().startOf('day')
        const end = moment().endOf('day')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '上周',
      onClick (picker) {
        const start = moment().subtract(1, 'week').startOf('isoWeek')
        const end = moment().subtract(1, 'week').endOf('isoWeek')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '本周',
      onClick (picker) {
        const start = moment().startOf('isoWeek')
        const end = moment().endOf('isoWeek')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '上月',
      onClick (picker) {
        const start = moment().subtract(1, 'month').startOf('month')
        const end = moment().subtract(1, 'month').endOf('month')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '本月',
      onClick (picker) {
        const start = moment().startOf('month')
        const end = moment().endOf('month')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '去年',
      onClick (picker) {
        const start = moment().subtract(1, 'year').startOf('year')
        const end = moment().subtract(1, 'year').endOf('year')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '本年',
      onClick (picker) {
        const start = moment().startOf('year').startOf('month')
        const end = moment().endOf('year')
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '过去7天',
      onClick (picker) {
        const start = moment().subtract(7, 'days')
        const end = moment(new Date())
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '过去30天',
      onClick (picker) {
        const start = moment().subtract(30, 'days')
        const end = moment(new Date())
        picker.$emit('pick', [start, end])
      }
    }
  ]
}
