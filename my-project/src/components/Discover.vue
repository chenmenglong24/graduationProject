<template>
  <div>
    <div class="swipe-box">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item, index) in bannerList" :key="index"><img :src="item.pic"/></mt-swipe-item>
        <!-- <mt-swipe-item><img src="@/assets/swipe.jpg"/></mt-swipe-item>
        <mt-swipe-item><img src="@/assets/swipe.jpg"/></mt-swipe-item> -->
      </mt-swipe>
    </div>
    <div class="icon-box">
      <div class="icon"><img src="@/assets/iconbar/recommend.png"/><span>推荐</span></div>
      <div class="icon"><img src="@/assets/iconbar/hotkey.png"/><span>热门</span></div>
      <div class="icon"><img src="@/assets/iconbar/special.png"/><span>专题</span></div>
      <div class="icon"><img src="@/assets/iconbar/detail.png"/><span>精选</span></div>
    </div>
    <div class="update-box">
      <div class="today-update">— 热门歌手 —</div>
      <div class="update">
        <div class="update-item" v-for="(item, index) in topArtistsList" :key="index" @click="toSingerDetail(item.id)">
          <img :src="item.picUrl"/>
          <span>{{item.name}}</span>
        </div>
        <div class="update-item">
          <div class="update-more">更多</div>
        </div>
      </div>
    </div>
    <div class="sorts-box">
      <div class="title-box">
        <span class="title">精品歌单</span>
        <span class="more">更多</span>
      </div>
      <div class="items">
        <!-- <router-link to='/detail' tag="span" > -->
          <div class="item" v-for="(item, index) in topPlaylist" :key="index" @click="toPlaylistDetail(item.id)">
            <img :src="item.coverImgUrl" />
            <span>{{item.name}}</span>
          </div>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="sorts-box">
      <div class="title-box">
        <span class="title">新碟上架</span>
        <span class="more">更多</span>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in topAlbumList" :key="index">
          <img :src="item.blurPicUrl" />
          <span class="top-album-name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="sorts-box">
      <div class="title-box">
        <span class="title">热门电台</span>
        <span class="more">更多</span>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in djHotList" :key="index">
          <img :src="item.picUrl" />
          <span class="top-album-name">{{item.name+'('+item.rcmdtext+')'}}</span>
        </div>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>
<script>
import Axios from 'axios';
export default {
  data () {
    return {
      // bookLists: [],
      bannerList: [],
      topArtistsList: [],
      topPlaylist: [],
      topAlbumList: [],
      djHotList: []
    }
  },
  computed: {
    dataSrc () {      
      return this.$store.state.bookLists;
    }
  },
  created() {
    this.banner()
    this.topArtists()
    this.topPlaylistHighquality()
    this.topAlbum()
    this.djHot()
  },
  methods: {
    banner() {
      this.$api.banner({type: 2}).then(res => {
        if(res.code === 200) {
          // console.log(res)
          this.bannerList = res.banners
        }
      })
    },
    topArtists() {
      this.$api.topArtists({offset: 0, limit: 10}).then(res => {
        if(res.code === 200) {
          // console.log(res)
          this.topArtistsList = res.artists
        }
      })
    },
    topPlaylistHighquality() {
      this.$api.topPlaylistHighquality({limit: 10}).then(res => {
        if(res.code === 200) {
          // console.log(res)
          this.topPlaylist = res.playlists
        }
      })
    },
    topAlbum() {
      this.$api.topAlbum({offset: 0, limit: 10}).then(res => {
        if(res.code === 200) {
          // console.log(res)
          this.topAlbumList = res.albums
        }
      })
    },
    djHot() {
      this.$api.djHot({offset: 0, limit: 10}).then(res => {
        if(res.code === 200) {
          // console.log(res)
          this.djHotList = res.djRadios
        }
      })
    },
    // getDate () {
    //   var dataSource = 'https://www.easy-mock.com/mock/5ca45824c4e9a575b66b62c9/example/qingtingyingyu';
    //   Axios.get(dataSource).then((response) => {
    //     // console.log(response);
    //     this.swipeList = response.data.data;
    //   }).catch((error) => {
    //     console.log(error);
    //   })
    // },
    toSingerDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          'type': 'singer',
          'id': id
        }
      })
    },
    toPlaylistDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          'type': 'playList',
          'id': id
        }
      })
    }
  },
  mounted () {
    // this.getDate();
    // this.bookLists = this.$store.state.bookLists[0];
    // console.log(1);
    // console.log(this.bookLists);
    // console.log(this.$store.state.bookLists);
  }
}
</script>

<style scoped>
.mint-swipe{
  height: 180px;
  margin: 15px 10px;
  border-radius: 15px;
}
.mint-swipe-item{
  height: 180px;
}
.mint-swipe-item img{
  width: 100%;
  height: 180px;
}
.icon-box{
  margin: 20px 30px;
  display: flex;
  justify-content: space-between;
}
.icon{
  display: inline-block;
}
.icon img{
  width: 25px;
  height: 25px;
}
.icon span{
  display: block;
  font-size: 12px;
  letter-spacing: 1px;
  color: #555555;
}
.update-box{
  padding-top: 10px;
  height: 145px;
  /* background-color: rgba(131, 255, 127, 0.1); */
  background-color: #1AF840;
  margin-bottom: 35px;
}
.today-update{
  text-align: center;
  margin: 5px 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #ffffff;
  font-family: cursive;
}
.update{
  display: flex;
  margin-top: 20px;
  overflow-x: scroll;
  flex-wrap: nowrap;
}
.update::-webkit-scrollbar {
  width: 0;
}
.update-item{
  display: inline-block;
  margin-left: 11px;
  text-align: center;
}
.update-item img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.update-item span{
  width: 65px;
  display: block;
  margin-top: 10px;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 15px;
  /* font-family: monospace; */
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.update-more{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #cccccc;
  vertical-align: middle;
  font-size: 10px;
  line-height: 50px;
}
.sorts-box{
  margin: 10px;
}
.title-box{
  display: flex;
  justify-content: space-between;
}
.title{
  font-size: 18px;
  letter-spacing: 1px;
  font-family: cursive;
  font-weight: bold;
}
.title:before {   
  content: "";   
  display: inline-block;
  position: relative;
  top: 3px;
  width: 8px;
  height: 18px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: #1afa29;
}   
.more{
  font-size: 12px;
  letter-spacing: 1px;
  color: #1afa29;
}
.items{
  margin: 10px 8px;
  display: flex;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  overflow-x: scroll;
}
.items::-webkit-scrollbar{
  width: 0
}
.item{
  margin-right: 23px;
  width: 110px;
  text-align: center;
}
.item img{
  width: 100px;
  height: 105px;
  border-radius: 10px;
}
.item span{
  display: block;
  width: 100%;
  position: relative;
  /* left: 10px; */
  text-align: left;
  font-size: 13px;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #333333;
}
.top-album-name {
  text-align: center !important;
  -webkit-line-clamp: 2 !important;
}
</style>
