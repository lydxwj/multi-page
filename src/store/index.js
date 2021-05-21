import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

// 批量导入modules
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

Vue.use(Vuex)

// 父子页面实时通信
function createSync(win) {
  return store => {
    store.subscribe((mutation, state) => {
      if (win.__indexVue__ && win.frames[0].__sonVue__) {
        win.frames[0].__sonVue__.$store.replaceState(state);
      } else if (win.__sonVue__ && win.parent.__indexVue__) {
        win.parent.__indexVue__.$store.replaceState(state);
      }
    })
  }
}
const store = new Vuex.Store({
  plugins: [createPersistedState({ storage: window.localStorage }), createSync(window)],
  state: {
    userInfo: {
      name: 'A'
    },
    dialog: 0
  },
  modules,
  mutations: {
    updateUserInfo(state, obj) {
      state.userInfo = obj;
    },
    updateDialog(state, obj) {
      state.dialog = obj;
    }
  },
  actions: {
  },
  getters
})

export default store
