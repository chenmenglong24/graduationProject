import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
// import data from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchHistory: [],
    playingSong: {},
    playingSongList: [],
    likeSongsIdList: [],
    likeGDIdList: [],
    playHistoryIdList: []
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
    playingSong ({ commit }, song) {
      commit('PlayingSong', song)
    },
    playingSongList ({ commit }, songList) {
      commit('PlayingSongList', songList)
    },
    addMyLike ({ commit }, id) {
      commit('AddMyLike', id)
    },
    delMyLike ({ commit }, id) {
      commit('DelMyLike', id)
    },
    addMyLikeGD ({ commit }, id) {
      commit('AddMyLikeGD', id)
    },
    delMyLikeGD ({ commit }, id) {
      commit('DelMyLikeGD', id)
    },
    savePlayHistory ({ commit }, id) {
      commit('SavePlayHistory', id)
    }
  },
  mutations: {
    SaveHistory (state, searchKey) {
      let index = state.searchHistory.indexOf(searchKey);
      // 有过相同的搜索记录的话，把该搜索记录移到最前
      if (index != -1) {
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
    PlayingSong (state, song) {
      state.playingSong = song
    },
    PlayingSongList (state, songList) {
      state.playingSongList = songList
    },
    AddMyLike(state, id) {
      state.likeSongsIdList.unshift(id)
    },
    DelMyLike(state, id) {
      let index = state.likeSongsIdList.indexOf(id)
      state.likeSongsIdList.splice(index, 1)
    },
    AddMyLikeGD(state, id) {
      state.likeGDIdList.unshift(id)
    },
    DelMyLikeGD(state, id) {
      let index = state.likeGDIdList.indexOf(id)
      state.likeGDIdList.splice(index, 1)
    },
    SavePlayHistory(state, id) {
      let index = state.playHistoryIdList.indexOf(id)
      if(index != -1) {
        state.playHistoryIdList.splice(index, 1)
      }
      state.playHistoryIdList.unshift(id)
    }
  },
  getters: {
    
  }
})