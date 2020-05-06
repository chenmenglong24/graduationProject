import axios from 'axios'
import { Toast } from 'mint-ui';

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:3000'

// axios配置
axios.interceptors.response.use((res) => {
  if(res.data.code !== 200) {
    Toast({
      message: '网络异常',
      position: 'middle',
      duration: 1000
    })
    return Promise.reject(res)
  }
  return res
}, (error) => {
  Toast({
    message: '网络异常',
    position: 'middle',
    duration: 1000
  })
  return Promise.reject(error)
})

export function dataGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {
  // 热搜
  hotSearchKey() {
    return dataGet('/search/hot')
  },
  // 歌曲搜索
  musicSearch(params) {
    return dataGet('/search?limit=60', params)
  },
  // 专辑内容，主要用来获取歌曲封面
  album(params) {
    return dataGet('/album', params)
  },
  // 获取音乐url
  musicUrl(params) {
    return dataGet('/song/url', params)
  },
  // 获取歌词
  musicLyric(params) {
    return dataGet('/lyric', params)
  },
  // 轮播图
  banner(params) {
    return dataGet('/banner', params)
  },
  // 热门歌手
  topArtists(params) {
    return dataGet('/top/artists', params)
  },
  // 获取歌手单曲
  artistSong(params) {
    return dataGet('/artists', params)
  },
  // 热门歌单
  topPlaylistHighquality(params) {
    return dataGet('/top/playlist/highquality', params)
  },
  // 歌单详情
  playlistSong(params) {
    return dataGet('/playlist/detail', params)
  },
  // 歌曲详情
  songDetail(params) {
    return dataGet('/song/detail', params)
  },
  // 新碟上架
  topAlbum(params) {
    return dataGet('/top/album', params)
  },
  // 热门电台
  djHot(params) {
    return dataGet('/dj/hot', params)
  },
  // 榜单
  topList(params) {
    return dataGet('/top/list', params)
  },
  // mv排行
  topMV(params) {
    return dataGet('/top/mv', params)
  },
  // mv详情
  MVdetail(params) {
    return dataGet('/mv/detail', params)
  }
}