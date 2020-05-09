<template>
  <div id="app">
    <router-view/>
    <!-- <router-link tag="span" to="/play" v-if="$route.name != 'Play'"> -->
      <!-- <v-footbar></v-footbar> -->
    <!-- </router-link> -->
    <!-- <play></play> -->
  </div>
</template>

<script>
import Footbar from '@/components/Footbar'
// import Play from '@/components/Footbar'
export default {
  name: 'App',
  components: {
    'v-footbar': Footbar
    // 'play': Play
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
