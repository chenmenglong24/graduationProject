import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
import data from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bookLists: data,
    searchHistory: [],
    mySubscribe: [],
    myCollect: [],
    myDownload: []
  },
  actions: {
    saveHistory ({ commit }, searchKey) {
      commit('SaveHistory', searchKey)
    },
    deleteHistory ({ commit }, index) {
      commit('DeleteHistory', index)
    },
    deleteAllHistory ({ commit }) {
      commit('DeleteAllHistory')
    },
    addMySubscribe ({ commit }, id) {
      commit('AddMySubscribe', id)
    },
    delMySubscribe ({ commit }, index) {
      commit('DelMySubscribe', index)
    }
  },
  mutations: {
    SaveHistory (state, searchKey) {
      let index = state.searchHistory.indexOf(searchKey);
      // 有过相同的搜索记录的话，把该搜索记录移到最前
      if (index !== -1) {
        state.searchHistory.splice(index, 1)
      }
      state.searchHistory.unshift(searchKey)
    },
    DeleteHistory (state, index) {
      state.searchHistory.splice(index, 1);
    },
    DeleteAllHistory (state) {
      state.searchHistory.splice(0);
    },
    AddMySubscribe (state, id) {
      // state.isSubscribe = true;

      let exist = state.mySubscribe.some((item) => {
        return id == item.id
      })

      if (exist) {
        // console.log(state.mySubscribe);
        return
      } else {
        let item = state.bookLists[id];
        state.mySubscribe.push(item);
        item.isSubscribe = true;
        console.log(item);
      }
    },
    DelMySubscribe (state, index) {
      let id = state.mySubscribe[index].id;
      let item = state.bookLists[id];
      item.isSubscribe = false;
      console.log(item)
      state.mySubscribe.splice(index, 1);
    }
  },
  getters: {
    
  }
})