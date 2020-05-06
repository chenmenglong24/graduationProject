<template>
  <div class="my-box">
    <div class="my-items">
      <div class="my-item" :id="0" :class="{select:0==currentId}" @click="select">我喜欢的</div>
      <div class="my-item" :id="1" :class="{select:1==currentId}" @click="select">收藏歌单</div>
      <!-- <div class="my-item" :id="2" :class="{select:2==currentId}" @click="select">我喜欢的</div> -->
      <div class="my-item" :id="3" :class="{select:3==currentId}" @click="select">播放历史</div>
    </div>
    <div class="items-box">
      <div class="items">
        <div class="items-title">我喜欢的</div>
        <div class="null" v-if="!likeSongsList.length">暂无喜欢哦~</div>
        <div class="search-result">
          <ul>
            <li v-for="(item, index) in likeSongsList" :key="index" class="music-list" @click="getMusicUrl(item)">
              <img class="musicNote-img" src="../assets/musicNote.png"/>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        
      </div>
      <div class="items">
        <div class="items-title">收藏歌单</div>
        <div class="null" v-if="!likeGDList.length">暂无收藏歌单哦~</div>
        <div class="recommend" v-for="(item, index) in likeGDList" :key="index" @click="toPlaylistDetail(item.id)">
          <div class="recommend-img">
            <img :src="item.coverImgUrl">
          </div>
          <div class="introduce">
            <div class="title">{{item.name}}</div>
            <div class="label">
              <ul>
                <li v-for="(tag, index) in item.tags" :key="index">· {{tag}}</li>
              </ul>
            </div>
            <!-- <div class="delete" @click="delMySubscribe(index)" @click.stop="">x</div> -->
          </div>
        </div>
      </div>
      <!-- <div class="items">
        <div class="items-title">我的下载</div>
        <div class="recommend">
          <div class="recommend-img">
            <img src="../assets/swipe.jpg">
          </div>
          <div class="introduce">
            <div class="title">意趣英语</div>
            <div class="desc">深度美剧讲解，自然法口语学习</div>
            <div class="label">
              <ul>
                <li>· 美剧</li>
                <li>· 口语</li>
                <li>· 商务英语</li>
                <li>· 发音</li>
              </ul>
            </div>
            <div class="delete">x</div>
          </div>
        </div>
      </div> -->
      <div class="items">
        <div class="items-title">播放历史</div>
        <div class="null" v-if="!playHistoryList.length">暂无播放历史哦~</div>
        <div class="search-result">
          <ul>
            <li v-for="(item, index) in playHistoryList" :key="index" class="music-list" @click="getMusicUrl(item)">
              <img class="musicNote-img" src="../assets/musicNote.png"/>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '我是My组件',
      currentId: '0',
      likeSongsList: [],
      likeGDList: [],
      playHistoryList: []
    }
  },
  created() {
    let likeSongsIdList = this.$store.state.likeSongsIdList
    let likeGDIdList = this.$store.state.likeGDIdList
    let playHistoryIdList = this.$store.state.playHistoryIdList
    // console.log(likeSongsIdList)
    // console.log(likeGDIdList)
    console.log(playHistoryIdList)
    if(likeSongsIdList.length > 0) {
      this.likeSongs(likeSongsIdList)
    }
    if(likeGDIdList.length > 0) {
      this.likeGD(likeGDIdList)
    }
    if(playHistoryIdList.length > 0) {
      this.playHistory(playHistoryIdList)
    }
  },
  mounted () {
    var id = localStorage.getItem('currentId');
    this.currentId = id;
  },
  methods: {
    select (e) {
      this.currentId = e.target.id;
      localStorage.setItem('currentId', this.currentId);
    },
    likeSongs(ids) {
      this.$api.songDetail({ids: ids.join(',')}).then(res => {
        if(res.code === 200) {
          this.likeSongsList = res.songs
        }
      })
    },
    likeGD(idList) {
      this.likeGDList = []
      idList.forEach(listId => {
        this.$api.playlistSong({id: listId}).then(res => {
          this.likeGDList.push(res.playlist)
        })
      })
    },
    playHistory(ids) {
      this.$api.songDetail({ids: ids.join(',')}).then(res => {
        if(res.code === 200) {
          this.playHistoryList = res.songs
        }
      })
    },
    getMusicUrl(item) {
      let songId = item.id
      let albumId = item.al.id
      let artists = item.ar
      let artistsArr = artists.map(element => {
        return element.name
      })
      let songName = item.name
      this.$api.musicUrl({id: songId}).then(res => {
        if(res.code === 200) {
          let songInfo = {
            // 'cover': songCover,
            'albumId': albumId,
            'artists': artistsArr,
            'songName': songName
          }
          songInfo = Object.assign(songInfo, res.data[0])
          this.$store.dispatch('playingSong', songInfo)
          this.$router.push('/Play')
        }
      })
    },
    // delMySubscribe (index) {
    //   this.$store.dispatch('delMySubscribe', index);
    // },
    toPlaylistDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          'type': 'playList',
          'id': id
        }
      })
    }
  }
}
</script>

<style scoped>
.my-box{
  display: flex;
}
.my-items{
  flex: 0 0 auto;
  background-color: #eeeeee;
  width: 20vw;
  height: 80vh;
  padding-top: 30px;
}
.my-item{
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
}
.select{
  background-color: #ffffff;
}
.items-box{
  flex: 1 1 auto;
  overflow-y: auto;
  height: 80vh;
}
.items{
  margin: 20px 0 60px 20px;
}
.items-title{
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 10px;
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
.recommend{
  margin: 10px 0 10px 5px;
  display: flex;
}
.recommend-img{
  margin: 10px 0 5px 0;
}
.recommend-img img{
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
.introduce{
  flex: auto;
  margin-top: 10px;
  margin-left: 15px;
  width: 50vw;
  position: relative;
  border-bottom: solid 1px #dddddd;
}
.title{
  padding-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.desc{
  letter-spacing: 0.5px;
  font-size: 11px;
  color: #666666;
  margin-top: 5px;
  padding-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.label{
  padding-bottom: 5px;
  display: inline-block;
}
.label ul{
  margin: 0;
  padding: 0;
}
.label li{
  display: inline;
  font-size: 12px;
  margin-right: 5px;
  color: #333333;
}
.delete{
  display: inline-block;
  width: 14px;
  height: 10px;
  border: solid 2px #cccccc;
  border-radius: 6px;
  font-size: 12px;
  text-align: center;
  line-height: 8px;
  color: #bbbbbb;
  position: absolute;
  right: 10px;
  bottom: 5px;
}
.search-result ul{
  padding: 0;
  margin: 0;
}
.search-result{
  border-radius: 50%;
}
.search-result li{
  list-style-type: none;
}
.music-list{
  padding: 0 10px;
  border-bottom: solid 1px #dddddd;
  padding-bottom: 5px;
  height: 35px;
  line-height: 45px;
  /* background-color: #eeeeee; */
  background-color: #666666;
  color: #eeeeee;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 1; */
  white-space: nowrap;
  /* -webkit-box-orient: vertical; */
}
.musicNote-img{
  display: inline-block;
  width: 20px;
  height: 20px;
  /* top: 8px; */
}
</style>
