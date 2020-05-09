import table from '@/store/table'
import { MergeRecursive } from '@/utils/fun'
import { Message } from 'element-ui'
import { jsencryptPub } from '@/config/jsencrypt'
import { JSEncrypt } from 'jsencrypt'
import { cloneDeep } from 'lodash'

const store = {
  namespaced: true,
  state: {
    complexForm: {
      ...cloneDeep(table.state),
      editType: 'edit',
      editUrl: 'ACCOUNT_PASSWORD_UPDATE'
    }
  },
  actions: {
    async complexFormConfirm ({ dispatch, state }, obj) {
      let ruleForm = state.complexForm.ruleForm
      let oldPasswordShow = ruleForm.oldPasswordShow
      let newPasswordShow = ruleForm.newPasswordShow
      let newPasswordConfirm = ruleForm.newPasswordConfirm
      if (oldPasswordShow === newPasswordShow) {
        return Message.error('新密码不能与旧密码相同')
      }
      if (newPasswordShow !== newPasswordConfirm) {
        return Message.error('确认密码与新密码不一致')
      }
      ruleForm.oldPassword = encryptedData(jsencryptPub, oldPasswordShow)
      ruleForm.newPassword = encryptedData(jsencryptPub, newPasswordShow)
      await dispatch('complexFormConfirmRequest', obj)
    }
  }
}

export default MergeRecursive(table, store)

// 加密
function encryptedData (publicKey, data) {
  // 新建JSEncrypt对象
  let encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(publicKey)
  // 加密数据
  return encryptor.encrypt(data)
}
