<template>
  <div class="mv-box">
    <div class="header">
      <span @click="back"><mt-cell class="back" icon="back"></mt-cell></span>
    </div>
    <div class="mv-wrapper">
      <video class="player" 
        :src="MVinfo.brs['1080'] || MVinfo.brs['720'] || MVinfo.brs['480'] || MVinfo.brs['360'] || MVinfo.brs['240']"
        controls="controls" autoplay>   
      </video>
      <div class="desc-box">
        <div class="title">
          {{MVinfo.name}}-{{MVinfo.artistName}}
        </div>
        <div class="desc">{{MVinfo.desc}}</div>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MVinfo: {}
    }
  },
  created() {
    let MVid = this.$route.query.MVid
    this.$api.MVdetail({mvid: MVid}).then(res => {
      if(res.code === 200) {
        this.MVinfo = res.data
      }
    })
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>
.mv-box{
  width: 100%;
}
.header{
  border-bottom: 1.5px solid rgba(99, 99, 99, 0.1);
}
.player{
  width: 100%;
}
.desc-box{
  padding: 15px 10px;
  background-color: #666666;
}
.title{
  font-size: 20px;
  color: #eeeeee;
}
.desc{
  margin-top: 10px;
  height: 450px;
  color: #bbbbbb;
}
</style>


