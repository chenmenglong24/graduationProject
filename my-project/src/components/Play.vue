<template>
  <!-- <transition name="play-page"> -->
    <div class="play-box">
      <span @click="back"><mt-cell class="back" icon="back"></mt-cell></span>
      <div class="cover">
        <div style="padding-top: 20px; color: #666666; text-shadow:1px 5px 24px #000">
          <span>歌曲:</span>
          <span>{{playingSong.songName}}</span>
        </div>
        <div style="padding-top: 10px; color: #666666; text-shadow:1px 5px 24px #000">
          <span>作者:</span>
          <!-- <span v-for="(name, index) in playingSong.artists" :key="index">{{name}}</span> -->
          <span>{{playingSong.artists.join('/')}}</span>
        </div>
        <img :src="playingSong.cover" class="cover-img" alt="" id="cover">
        <div class="time">
          <span>00.00</span>
          <span>{{size}}</span>
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
      // cover: '',
      size: ''
    }
  },
  created() {
    this.playingSong = this.$store.state.playingSong
    console.log(this.playingSong)
  },
  mounted() {
    let audio = document.getElementById('audio')
    audio.play()
    console.log('页面加载进来时audio.paused：',audio.paused)
    audio.oncanplay = function () {
      // console.log(audio.duration)
      this.size = String(audio.duration/60 | 0) + '.' + String(audio.duration%60 | 0)
      console.log(this.size)
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    show () {
      this.see = !this.see
    },
    playPause () {
      let audio = document.getElementById('audio');
      let cover = document.getElementById('cover');
      let playBtn = this.$refs.playBtn;
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
    }
  }
}
</script>

<style scoped>
.play-box{
  background-color: #eeeeee;
  height: 100vh;
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
  margin: 20px;
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
}
.time{
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 27vh;
}
.time span{
  margin: 0 20px;
  color: #ffffff;
  text-shadow:1px 1px 8px #000
}
.cover-img{
  width: 180px;
  height: 180px;
  position: relative;
  top: 100px;
  border-radius: 50%;
  border: solid #ffffff 40px;
  box-shadow: #666666 0px 0px 5px 1px ;
  animation: rotate 10s linear infinite;
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
</style>