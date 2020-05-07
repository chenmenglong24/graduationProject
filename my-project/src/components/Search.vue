<template>
  <div>
    <div class="search-header">
      <span @click="back"><mt-cell class="back" icon="back"></mt-cell></span>
      <div class="search">
        <input v-model="value" placeholder="搜索歌曲、MV、电台. . ." />
        <button class="btn" :class="{ifCLick: ifClick}" ref="btn" @touchstart="handleStart" @touchend="handleEnd" @click="search">搜索</button>
      </div>
    </div>
    <div style="height: 48px;"></div>
    <!-- 搜索结果 -->
    <div class="search-result" v-if="value.length">
      <ul>
        <li v-for="(item, index) in searchResult" :key="index" class="music-list" @click="getMusicUrl(index)">
          <img class="musicNote-img" src="../assets/musicNote.png"/>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 热门搜索 -->
    <div class="hot-key-box" v-if="!value.length">
        <span class="title">热门搜索</span>
        <div class="hot-keys">
          <div class="hot-key" v-for="(item, index) in hotKeys" :key="index" @click="hotKeySearch(index)">{{item.first}}</div>
        </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history-box" v-if="!value.length">
      <div class="title-box">
        <span class="title">搜索历史</span>
        <span class="delete" @click="deleteAllHistory">删除记录</span>
        <div class="null" v-if="!searchHistory.length">暂无搜索记录</div>
        <div class="search-histories">
          <div class="search-history" v-for="(item, index) in searchHistory" :key="index" @click="historySearch(index)">
            <img class="search-img" src="../assets/search-history.png"/>
            {{item}}
            <img class="delete-img" src="../assets/delete-history.png" @click.stop="deleteHistory(index)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'page-search',
  data() {
    return {
      value: '',
      ifClick: false,
      defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian',
        'Lemon',
        'Peach',
        'Cherry',
        'Berry',
        'Core',
        'Fig',
        'Haw',
        'Melon',
        'Plum',
        'Pear',
        'Peanut',
        'Other'
      ],
      searchResult: [],
      hotKeys: [],
      // playingSong: {}
    };
  },
  computed: {
    // filterResult() {
    //   return this.defaultResult.filter(item => new RegExp(this.value, 'i').test(item));
    // },
    searchHistory () {
      let history = [];
      history.push(...this.$store.state.searchHistory);
      return history
    }
    
  },
  created() {
    // 获取热搜
    this.$api.hotSearchKey().then(res => {
      if(res.code === 200) {
        this.hotKeys = res.result.hots
      }
    })
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleStart() {
      this.ifClick = true;
    },
    handleEnd() {
      this.ifClick = false;
    },
    search() {
      if(this.value.replace(/(^\s*)|(\s*$)/g, "") =="") {
        Toast({
          message: '请输入内容',
          position: 'top',
          duration: 1000
        })
        } else {          
          let searchKey = this.value
          this.$store.dispatch('saveHistory', searchKey)
          this.$api.musicSearch({keywords: this.value}).then(res => {
            if(res.code === 200) {
              this.searchResult = res.result.songs
            }
          })
      }
    },
    getMusicUrl(index) {
      // let songId = this.searchResult[index].id
      // let albumId = this.searchResult[index].album.id
      // let artists = this.searchResult[index].artists
      // let artistsArr = artists.map(item => {
        // return item.name
      // })
      // let songName = this.searchResult[index].name
      // this.$api.musicUrl({id: songId}).then(res => {
        // if(res.code === 200) {
          // let songInfo = {
          //   'albumId': albumId,
          //   'artists': artistsArr,
          //   'songName': songName
          // }
          // songInfo = Object.assign(songInfo, res.data[0])
          // this.$store.dispatch('playingSong', songInfo)
          this.$store.dispatch('playingSong', this.searchResult[index])
          // console.log('当前播放歌曲:', this.$store.state.playingSong)
          this.$store.dispatch('playingSongList', this.searchResult)
          // console.log('当前播放列表:', this.$store.state.playingSongList)
          this.$router.push('/Play')
        // }
      // })
    },
    hotKeySearch(index) {
      this.value = this.hotKeys[index].first
      this.$api.musicSearch({keywords: this.value}).then(res => {
        if(res.code === 200) {
          this.searchResult = res.result.songs
        }
      })
      this.$store.dispatch('saveHistory', this.value)
    },
    historySearch(index) {
      this.value = this.$store.state.searchHistory[index]
      this.$api.musicSearch({keywords: this.value}).then(res => {
        if(res.code === 200) {
          this.searchResult = res.result.songs
        }
      })
      this.$store.dispatch('saveHistory', this.value)
    },
    deleteHistory(index) {
      this.$store.dispatch('deleteHistory', index)
    },
    deleteAllHistory() {
      this.$store.dispatch('deleteAllHistory');
    }
  }
};
</script>

<style lang="css" scoped>
.search-header{
  position: fixed;
  background-color: #ffffff;
  width: 100%;
}
.back{
  display: inline-block;
  position: static;
  overflow: visible;
}
.search{
  display: inline-block;
  margin-left: 5px;
}
.search input{
  border: none;
  outline: none;
  height: 48px;
  width: 65vw;
  font-size: 16px;
}
.btn{
  margin-left: 24px;
  border: none;
  outline: none;
  color: #ffffff;
  background-color: #cccccc;
  height: 30px;
  width: 50px;
  padding: 5px;
  letter-spacing: 2px;
  font-size: 15px;
  border-radius: 5px;
}
.ifCLick{
  background-color: #1afa29;
}
.search-result ul{
  padding: 0;
}
.search-result li{
  list-style-type: none;
}
.hot-key-box{
  height: 200px;
  margin: 10px;
}
.hot-keys{
  margin: 10px 0;
}
.hot-key{
  display: inline-block;
  margin: 8px 10px;
  padding: 5px 10px;
  font-size: 15px;
  color: #ffffff;
  background-color: #62d3a6;
  border-radius: 15px;
}
.search-history-box{
  margin: 30px 10px 10px 10px;
}
.title{
  font-size: 13px;
  letter-spacing: 1px;
}
.title:before {   
  content: "";   
  display: inline-block;
  position: relative;
  top: 3px;
  width: 8px;
  height: 15px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: #1afa29;
}
.delete{
  font-size: 12px;
  letter-spacing: 1px;
  color: #666666;
  position: absolute;
  right: 20px;
}   
.null{
  margin: 15px 10px;
  font-size: 12px;
  letter-spacing: 1px;
  text-align: center;
  color: #999999;
  padding: 2px;
  border-bottom: solid 1px #dddddd;
}
.search-history{
  margin: 15px 10px;
  font-size: 14px;
  color: #333333;
  padding: 2px;
  border-bottom: solid 1px #dddddd;
}
.musicNote-img{
  display: inline-block;
  width: 20px;
  height: 20px;
  /* top: 8px; */
}
.music-list{
  padding: 0 10px;
  border-bottom: solid 1px #dddddd;
  padding-bottom: 5px;
  height: 40px;
  line-height: 45px;
  /* background-color: #eeeeee; */
  background-color: #666666;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 1; */
  white-space: nowrap;
  /* -webkit-box-orient: vertical; */
}
.search-img{
  display: inline-block;
  width: 16px;
  height: 16px;
}
.delete-img{
  display: inline-block;
  width: 16px;
  height: 16px;
  /* vertical-align: middle; */
  position: absolute;
  right: 20px;
}

</style>