<template>
  <!-- <transition name="play-page"> -->
    <div class="play-box" id="playPage">
      <span @click="back"><mt-cell class="back" icon="back"></mt-cell></span>
      <div class="cover" @click="showLyric">
        <div style="padding-top: 20px; color: #ffffff; text-shadow:1px 5px 24px #000">
          <span>歌曲:</span>
          <span>{{playingSong.songName}}</span>
        </div>
        <div style="padding-top: 10px; color: #ffffff; text-shadow:1px 5px 24px #000">
          <span>作者:</span>
          <!-- <span v-for="(name, index) in playingSong.artists" :key="index">{{name}}</span> -->
          <span>{{playingSong.artists.join('/')}}</span>
        </div>
        <img :src="cover" class="cover-img" alt="" id="cover" >
        <!-- 歌词 -->
        <div class="lyric" id="lyric" style="display:flex;" @click.stop="hideLyric">
          <div class="lyric-font" v-if="playingSong.lyric == undefined">暂无歌词</div>
          <div v-html="playingSong.lyric" class="lyric-font" v-else></div>
        </div>
        <!-- 喜欢 -->
        <div class="like">
          <div class="like-img" v-if="!like">
           <img src="../assets/unlike.png" @click.stop="doLike"/>
          </div>
          <div class="like-img" v-if="like">
            <img src="../assets/like.png" @click.stop="doLike"/>
          </div>
        </div>
        <!-- 进度条 -->
        <div class="time">
          <span class="current-time">{{format(currentTime)}}</span>
          <div class="progress-bar">
            <div class="progress-ball" :style="{width: (currentTime / size)*100 + '%'}">
              <div style="width:6px;height:6px;background-color:#1afa29;position:relative;left:100%;bottom:1.5px;border-radius:6px;"></div>
            </div>
          </div>
          <span class="size">{{sizeStr}}</span>
        </div>
      </div>
      <div class="play-bar">
        <div class="audio-box">
          <div class="pre">
            <img src="../assets/pre.png" alt="">
          </div>
          <div class="switch-box">
            <img ref="playBtn" :class="[play ? 'switchPlay' : 'switchPause']" id="switch" src="../assets/play.png" @click="playPause"/>
            <audio id="audio" 
              :src="playingSong.url" 
              @timeupdate="timeGoes"
              @ended="songEnd"
              >
            </audio>
          </div>
          <div class="next">
            <img src="../assets/next.png" alt="">
          </div>
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  data () {
    return {
      msg: '我是播放页面',
      see: true,
      play: true,
      playingSong: {},
      cover: '',
      currentTime: '0.00',
      sizeStr: '0.00',
      size: 0,
      lyric: '',
      like: false
    }
  },
  created() {
    this.playingSong = this.$store.state.playingSong
    console.log(this.playingSong)
    this.getCover()
    this.getLyric()
    let index = this.$store.state.likeSongsIdList.indexOf(this.playingSong.id)
    if(index != -1) {
      this.like = true
    }
  },
  mounted() {
    let that = this
    let audio = document.getElementById('audio')
    audio.play()
    console.log('页面加载进来时audio.paused：', audio.paused)
    audio.oncanplay = function () {
      that.size = audio.duration
      if(String(audio.duration%60 | 0).length === 1) {
        that.sizeStr = String(audio.duration/60 | 0) + ':' + '0' + String(audio.duration%60 | 0)
      } else {
        that.sizeStr = String(audio.duration/60 | 0) + ':' + String(audio.duration%60 | 0)
      }
      // console.log(that.size)
      // console.log(that.sizeStr)
      that.$store.dispatch('savePlayHistory', that.playingSong.id)
      // console.log(that.$store.state.playHistoryIdList)
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
      // let playPage = document.getElementById('playPage')
      // playPage.style.display = 'none'
    },
    getCover() {
      this.$api.album({id: this.playingSong.albumId}).then(res => {
        if(res.code === 200) {
          this.cover = res.album.blurPicUrl
        } 
      })
    },
    getLyric() {
      this.$api.musicLyric({id: this.playingSong.id}).then(res => {
        if(res.code === 200) {
          // songInfo = Object.assign(songInfo, {'lyric': res.lrc.lyric})
          // this.$store.dispatch('playingSong', songInfo)
          this.lyric = res.lrc.lyric
          this.formatLyric(this.lyric)
        }
      })
    },
    formatLyric(lyric) {
      let flag = false
      let lyricArr = []
      for(let i = 0; i < this.lyric.length; i++) {
        if(this.lyric[i] === '[') {
          flag = false
        }
        if(flag) {
          lyricArr.push(this.lyric[i])
        }
        if(this.lyric[i] === ']') {
          flag = true
        }
      }
      // console.log(lyricArr.join(''))
      this.playingSong.lyric = lyricArr.join('').replace(/\n/g,"<br/>")
    },
    show () {
      this.see = !this.see
    },
    hideLyric() {
      let lyricBox = document.getElementById('lyric')
      // console.log(lyricBox.style.zIndex)
      lyric.style.zIndex = -1
    },
    showLyric() {
      let lyricBox = document.getElementById('lyric')
      lyric.style.zIndex = 99
    },
    format(seconds) {
      // if(seconds < this.size) {
        let minute = Number(seconds)/60 | 0
        let second = Number(seconds)%60 | 0
        let sec = second < 10 ? '0' + second : second
        return `${minute}:${sec}`
      // }
    },
    doLike() {
      let id = this.playingSong.id
      if(this.like) {
        this.like = false
        this.$store.dispatch('delMyLike', id)
      } else {
        this.like = true
        this.$store.dispatch('addMyLike', id)
      }
      // console.log(this.$store.state.likeSongsList)
    },
    timeGoes(e) {
      this.currentTime = e.target.currentTime
    },
    songEnd() {
      this.play = false
      let cover = document.getElementById('cover')
      let playBtn = this.$refs.playBtn
      playBtn.src = "/static/pause.png"
      cover.style=cover.style.cssText+"animation-play-state: paused;"
    },
    playPause () {
      let audio = document.getElementById('audio')
      let cover = document.getElementById('cover')
      let playBtn = this.$refs.playBtn
      if (audio.paused) {
        audio.play();
        console.log('点击播放按钮时audio.paused：',audio.paused)
        this.play = true
        playBtn.src = "/static/play.png"
        cover.style=cover.style.cssText+"animation-play-state: running;"

      } else {
        audio.pause();
        console.log('点击暂停按钮时audio.paused：',audio.paused)
        this.play = false
        playBtn.src = "/static/pause.png"
        cover.style=cover.style.cssText+"animation-play-state: paused;"
      }
    },
    
  }
}
</script>

<style scoped>
.play-box{
  position: fixed;
  background-color: #dddddd;
  height: 100vh;
  width: 100%;
}
.play-bar{
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  bottom: 0;
  left: 0;
  position: fixed;
}
.red{
  height: 100px;
  background-color: red;
}
.play-page-leave-active, .play-page-enter-active{
  transition: all 3s;
}
.play-page-leave-active, .play-page-enter{
  transform: translateY(250px)
}
/* .play-page-leave, .play-page-enter-active{
  transform: translateY(500px)
} */
.audio-box{
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 20px; */
  padding: 20px;
  background-color: #666666;
}
.switch-box{
  width: 80px;
  height: 80px;
  margin: 0 40px;
  background-color: #eeeeee;
  border-radius: 50%;
}
.pre{
  width: 60px;
  height: 60px;
  background-color: #eeeeee;
  border-radius: 50%;
}
.pre img{
  width: 30px;
  height: 30px;
  margin: 15px 0 0 15px;
}
.next{
  width: 60px;
  height: 60px;
  background-color: #eeeeee;
  border-radius: 50%;
}
.next img{
  width: 30px;
  height: 30px;
  margin: 15px 0 0 15px;
}
.switchPlay{
  width: 50px;
  height: 50px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 15px);
}
.switchPause{
  width: 50px;
  height: 50px;
  position: relative;
  left: 50%;
  transform: translate(-43%, 15px);
}
.cover{
  text-align: center;
  height: 78%;
  background-color: #666666;
}
.time{
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 150px;
}
.current-time{
  margin: 0 10px;
  color: #ffffff;
  text-shadow:1px 1px 8px #000
}
.size{
  margin: 0 10px;
  color: #ffffff;
  text-shadow:1px 1px 8px #000
}
.progress-bar{
  margin-top: 10px;
  width: 100%;
  height: 3px;
  background-color: #bbbbbb;
  border-radius: 5px;
  /* overflow: hidden; */
}
.progress-ball{
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
}
/* .progress-ball:after{
  content: "";
  position: relative;
  right: 0;
  height: 5px;
  width: 5px;
  background-color: #000000;
} */
.cover-img{
  width: 180px;
  height: 180px;
  position: relative;
  top: 100px;
  border-radius: 50%;
  border: solid #fefefe 40px;
  box-shadow: #aaaaaa 0px 0px 20px 3px ;
  animation: rotate 20s linear infinite;
  animation-play-state: running;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
.lyric{
  width: 345px;
  position: fixed;
  margin: 130px 35px;
  top: 0;
  height: 60%;
  overflow-y: scroll;
  z-index: -1;
  color: #ffffff;
  font-size: 17px;
  line-height: 30px;
  letter-spacing: 2px;
  background-color: rgba(103,103,103, 0.9);
  text-shadow: rgb(255, 255, 255) 1px 1px 30px;
}
.lyric::-webkit-scrollbar{
  width: 0
}
.like{
  position: relative;
  height: 50px;
  top: 105px;
}
.like-img{
  width: 50px;
  height: 50px;
  position: relative;
  left: 65px;
  box-shadow: #999999 0px 0px 10px 4px;
  border-radius: 50%;
  background-color: #fefefe;
}
.like img{
  width: 40px;
  height: 40px;
  position: relative;
  top: 6.5px;
}
.lyric-font{
  position: relative;
  left: 50%;
  transform: translate(-50%)
}
</style>