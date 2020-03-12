<<<<<<< HEAD
//操作local数据的工具函数模块
import store from 'store'

export default {
    saveUser (user) {
        store.set('user_key', user)
    },

    getUser () {
        return store.get('user_key') || {}
    },

    removeUser () {
        store.remove('user_key')
    }
}
=======
// 操作local数据的工具函数模块
import store from 'store'

export default {
  saveUser (user) {
    store.set('user_key', user)
  },

  getUser () {
    return store.get('user_key') || {}
  },

  removeUser () {
    store.remove('user_key')
  }
}
>>>>>>> f8f414d2f5c72d5afe6fbcf11ef605c8f1d55752
