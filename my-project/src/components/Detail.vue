<template>
  <div class="detail-box">
    <div class="header">
      <span @click="back"><mt-cell class="back" icon="back"></mt-cell></span>
    </div>
    <div class="details">
      <div class="details-img">
        <img :src="detailInfo.picUrl || detailInfo.coverImgUrl"/>
      </div>
      <div class="title">{{detailInfo.name}}</div>
      <div class="desc">{{detailInfo.briefDesc || detailInfo.description}}</div>
    </div>
    <div class="options" v-if="type === 'playList'">
      <div class="option subscribe" :id="0" @click="subscribe">
        <img src="../assets/detail/unsubscribe.png" v-if="!isSubscribe"/>
        <img src="../assets/detail/subscribe.png" v-if="isSubscribe"/>
        <span class="about">分享</span>
      </div>
      <span class="interval"></span>
      <div class="option collect" :id="1" @click="doCollect">
        <img src="../assets/detail/uncollection.png" v-if="!collect"/>
        <span class="about" v-if="!collect">收藏</span>
        <img src="../assets/detail/collection.png" v-if="collect"/>
        <span class="about" v-if="collect">已收藏</span>
      </div>
      <span class="interval"></span>
      <div class="option download" :id="2" @click="download">
        <img src="../assets/detail/undownload.png" v-if="!isDownload"/>
        <img src="../assets/detail/download.png" v-if="isDownload"/>
        <span class="about">下载</span>
      </div>
    </div>
    <div v-if="type === 'singer'" class="singer-bottom">
      歌手单曲
    </div>
    <!-- 歌曲 -->
    <div class="search-result">
      <ul>
        <li v-for="(item, index) in songList" :key="index" class="music-list" @click="toPlay(item)">
          <img class="musicNote-img" src="../assets/musicNote.png"/>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSubscribe: false,
      collect: false,
      isDownload: false,
      type: '',
      id: '',
      detailInfo: {},
      songList: []
    }  
  },
  created() {
    console.log(this.$route)
    this.type = this.$route.query.type
    let id = this.$route.query.id
    this.id = id
    if(this.type === 'singer') {
      this.artistSong(id)
    }
    if(this.type === 'playList') {
      this.playlistSong(id)
    }
    let index = this.$store.state.likeGDIdList.indexOf(String(id))
    if(index != -1) {
      this.collect = true
    }
  },
  methods: {
    artistSong(singerId) {
      this.$api.artistSong({id: singerId}).then(res => {
        if(res.code === 200) {
          this.detailInfo = res.artist
          this.songList = res.hotSongs
          console.log('歌手:', res.artist.name)
        }
      })
    },
    playlistSong(playListId) {
      this.$api.playlistSong({id: playListId}).then(res => {
        if(res.code === 200) {
          this.detailInfo = res.playlist
          let songIdList = res.privileges.map(item => {
            return item.id
          })
          this.$api.songDetail({ids: songIdList.join(',')}).then(res => {
            if(res.code === 200) {
              this.songList = res.songs
            }
          })
        }
      })
    },
    toPlay(item) {
      this.$store.dispatch('playingSong', item)
      this.$store.dispatch('playingSongList', this.songList)
      this.$router.push('/Play')
    },
    back () {
      this.$router.go(-1);
    },
    subscribe() {
      
    },
    doCollect () {
      let id = this.id
      if(this.collect) {
        this.collect = false
        this.$store.dispatch('delMyLikeGD', String(id))
      } else {
        this.collect = true
        this.$store.dispatch('addMyLikeGD', String(id))
      }
      console.log(this.$store.state.likeGDIdList)
    },
    download () {
      
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.header{
  border-bottom: 1.5px solid rgba(99, 99, 99, 0.1);
}
.details{
  padding: 15px;
  background-color: #333333;
}
.details-img{
  display: inline-block;
}
.details-img img{
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
.title{
  display: inline-block;
  width: 288px;
  position: relative;
  /* bottom: 60px; */
  top: -35px;
  margin-left: 10px;
  letter-spacing: 2px;
  font-size: 20px;
  color: #ffffff;
}
.desc{
  margin: 15px 0;
  color: #aaaaaa;
  font-size: 13px;
  letter-spacing: 1px;
}
.options{
  display: flex;
  margin: 1px 0 0px 0;
  padding: 15px 0;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
}
.option{
  flex: auto;
  text-align: center;
}
.option img{
  width: 20px;
  height: 20px;
}
.about{
  display: block;
  font-size: 13px;
  color: #999999;
  letter-spacing: 1px;
}
.interval{
  width: 1px;
  height: 25px;
  background-color: #999999;
  position: relative;
  top: 6px;
}
.singer-bottom{
  background-color: #eeeeee;
  letter-spacing: 5px;
  font-size: 18px;
  text-align: center;
  color: #333333;
  box-shadow: #ffffff 0px 0px 30px 0px;
}
.search-result ul{
  padding: 0;
  margin: 0;
}
.search-result li{
  list-style-type: none;
}
.music-list{
  padding: 0 10px;
  border-bottom: solid 1px #dddddd;
  padding-bottom: 5px;
  height: 40px;
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
