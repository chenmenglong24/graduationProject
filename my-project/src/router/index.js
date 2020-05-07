import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
  import My from '@/components/My'
  import Discover from '@/components/Discover'
  import Sort from '@/components/Sort'
  import Recommend from '@/components/Recommend'
import Search from '@/components/Search'
import Play from '@/components/Play'
import Detail from '@/components/Detail'
import MVdetail from '@/components/MVdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/discover',
      children: [
        {
          path: 'my',
          name: 'My',
          component: My,
          meta: {
            title: '我的'
          }
        },
        {
          path: 'discover',
          name: 'Discover',
          component: Discover,
          meta: {
            title: '发现'
          }
        },
        {
          path: 'sort',
          name: 'Sort',
          component: Sort,
          meta: {
            title: '排行榜'
          }
        },
        {
          path: 'recommend',
          name: 'Recommend',
          component: Recommend,
          meta: {
            title: '热门MV'
          }
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        title: '搜索页面'
      }
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      meta: {
        title: '播放页面'
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        title: '详情页'
      }
    },
    {
      path: '/MVdetail',
      name: 'MVdetail',
      component: MVdetail,
      meta: {
        title: 'MV页面'
      }
    }
  ]
})
