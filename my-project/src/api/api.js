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
    return dataGet('/search', params)
  }
}