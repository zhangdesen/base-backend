import Vue from 'vue'

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind (el, binding, vnode, oldVnode) {
    const dragDom = binding.value.$el.querySelector('.el-dialog')

    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft

      document.onmousemove = function (e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        dragDom.style.width = `${l}px`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

Vue.directive('inputEnter', {
  inserted (el, binding) {
    el.addEventListener('keypress', function (e) {
      const type = binding.value
      e = e || window.event
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      let re = /\d/
      switch (type) {
        // 整数
        case 'int':
          if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
          break
          // 小数
        case 'float':
          if (charcode === 46) {
            if (e.target.value.includes('.')) {
              e.preventDefault()
            }
          } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
          break
          // 数字
        case 'number':
          if (charcode === 46) {
            if (e.target.value.includes('.')) {
              e.preventDefault()
            }
          } else if (charcode === 101) {
            e.preventDefault()
          }
          break
          // 金额
        case 'money':
          const value = e.target.value
          const number = value.split('.')
          const start = e.target.selectionStart // 光标位置
          const pointIndex = value.indexOf('.')
          if (charcode === 46) {
            if (e.target.value.includes('.')) {
              e.preventDefault()
            }
          } else if (
            (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) ||
            (charcode === 101) ||
            (pointIndex !== -1 && (start - pointIndex >= 1 && number && number[1] && number[1].length > 1))) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
          break
          // 正数
        case 'positive':
          if ((charcode === 45 || charcode === 43) && (e.target.value.includes('-') || e.target.value.includes('+'))) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
          if (charcode === 46) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
          break
      }
    })
  }
})

Vue.directive('preventReClick', {
  bind (el, binding) {
    const time = binding.value || 2000
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.classList.add('is-disabled')
        // el.style.cursor = 'no-drop';
        setTimeout(() => {
          el.disabled = false
          el.classList.remove('is-disabled')
          // el.style.cursor = 'pointer'
        }, time)
      }
    })
  }
})
