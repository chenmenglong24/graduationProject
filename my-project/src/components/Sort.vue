<template>
  <div class="sort-box">
    <!-- <div class="sort-item">
      <div class="title-box">
        <div class="title">
          <img src="../assets/sorticon/exam.png"/>
          <span>英语考试</span>
        </div>
        <div class="more">
          <img src="../assets/sorticon/more.png"/>
        </div>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in exams" :key="index">{{item}}</div>
      </div>
    </div>
    <div class="sort-item">
      <div class="title-box">
        <div class="title">
          <img src="../assets/sorticon/pronunciation.png"/>
          <span>口语发音</span>
        </div>
        <div class="more">
          <img src="../assets/sorticon/more.png"/>
        </div>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in pro" :key="index">{{item}}</div>
      </div>
    </div>
    <div class="sort-item">
      <div class="title-box">
        <div class="title">
          <img src="../assets/sorticon/movies.png"/>
          <span>影视音乐</span>
        </div>
        <div class="more">
          <img src="../assets/sorticon/more.png"/>
        </div>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in movies" :key="index">{{item}}</div>
      </div>
    </div> -->
    <div class="items">
      <div class="item" @click="toPlaylistDetail(0)">
        <img src="../assets/sort/0.jpg" alt="">
        <div>云音乐新歌榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(1)">
        <img src="../assets/sort/1.jpg" alt="">
        <div>云音乐热歌榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(2)">
        <img src="../assets/sort/2.jpg" alt="">
        <div>网易原创歌曲榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(3)">
        <img src="../assets/sort/3.jpg" alt="">
        <div>云音乐飙升榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(4)">
        <img src="../assets/sort/4.jpg" alt="">
        <div>云音乐电音榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(5)">
        <img src="../assets/sort/5.jpg" alt="">
        <div>UK排行榜周榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(6)">
        <img src="../assets/sort/6.jpg" alt="">
        <div>美国Billboard周榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(7)">
        <img src="../assets/sort/7.jpg" alt="">
        <div>KTV嗨榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(8)">
        <img src="../assets/sort/8.jpg" alt="">
        <div>iTunes榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(9)">
        <img src="../assets/sort/9.jpg" alt="">
        <div>Hit FM Top榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(10)">
        <img src="../assets/sort/10.jpg" alt="">
        <div>日本Oricon周榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(11)">
        <img src="../assets/sort/11.jpg" alt="">
        <div>韩国Melon排行榜周榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(12)">
        <img src="../assets/sort/12.jpg" alt="">
        <div>韩国Mnet排行榜周榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(13)">
        <img src="../assets/sort/13.jpg" alt="">
        <div>韩国Melon原声周榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(14)">
        <img src="../assets/sort/14.jpg" alt="">
        <div>中国TOP排行榜(港台榜)</div>
      </div>
      <div class="item" @click="toPlaylistDetail(15)">
        <img src="../assets/sort/15.jpg" alt="">
        <div>中国TOP排行榜(内地榜)</div>
      </div>
      <div class="item" @click="toPlaylistDetail(16)">
        <img src="../assets/sort/16.jpg" alt="">
        <div>香港电台中文歌曲龙虎榜</div>
      </div>
      <div class="item" @click="toPlaylistDetail(17)">
        <img src="../assets/sort/17.jpg" alt="">
        <div>华语金曲榜</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // exams: [
      //   '雅思', '托福', '考研',
      //   '专八', '专四', '六级',
      //   '四级', '高中', '初中',
      //   '小学', 'PTE', 'BEC'
      // ],
      // pro: [
      //   '音标', '旅游口音', '商务职场', '美式口语', '英式口语'
      // ],
      // movies: [
      //   '美剧', '英剧', '名人传记', '纪录片', '动画动漫', '脱口秀', '歌曲'
      // ]
    }
  },
  created() {
    
  },
  methods: {
    toPlaylistDetail(id) {
      this.$api.topList({idx: id}).then(res => {
        if(res.code === 200) {
          let songListId = res.playlist.id
          this.$router.push({
            path: '/detail',
            query: {
              'type': 'playList',
              'id': songListId
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.sort-box{
  padding: 15px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.items{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
}
.item{
  /* display: inline-block; */
  width: 25%;
  height: 145px;
  margin: 10px 15px;
  text-align: center;
}
.item img{
  width: 100%;
  height: 100px;
}
.item div{
  height: 20px;
}
</style>
