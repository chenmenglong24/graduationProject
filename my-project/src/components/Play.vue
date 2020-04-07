<template>
  <!-- <transition name="play-page"> -->
    <div class="play-box">
      <span @click="back"><mt-cell class="back" icon="back"></mt-cell></span>
      {{msg}}
      <div class="play-bar">
        <div class="audio-box">
          <div class="switch-box">
            <img ref="playBtn" :class="[play ? 'switchPlay' : 'switchPause']" id="switch" src="../assets/play.png" @click="playPause"/>
          </div>
          <audio id="audio" 
            :src="playingSong.url" 
            >
          </audio>
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
      playingSong: {}
    }
  },
  created() {
    this.playingSong = this.$store.state.playingSong
    // console.log(this.playingSong.url)
  },
  mounted() {
    let audio = document.getElementById('audio')
    audio.play()
    console.log('页面加载进来时audio.paused：',audio.paused)
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    show () {
      this.see = !this.see
    },
    playPause () {
      var audio = document.getElementById('audio');
      var playBtn = this.$refs.playBtn;
      if (audio.paused) {
        audio.play();
        console.log('点击播放按钮时audio.paused：',audio.paused)
        this.play = true
        playBtn.src = "/static/play.png";
      } else {
        audio.pause();
        console.log('点击暂停按钮时audio.paused：',audio.paused)
        this.play = false
        playBtn.src = "/static/pause.png"
        // let switchNode = document.getElementById('switch')
        // console.log(switchNode)
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
.switch-box{
  width: 80px;
  height: 80px;
  background-color: #eeeeee;
  position: relative;
  left: 50%;
  transform: translate(-50%, 20px);
  border-radius: 50%;
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
</style>