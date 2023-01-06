<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
  
  <button v-on:click="scrollTop()" class="btn-backToTop">
    <div class="arrow-up"></div>
  </button> 
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  }),
  methods: {
    scrollTop() {
      window.scroll(0, 0);
    }
  }
}
</script>

<style>
  .btn-backToTop {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #a23f25;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    font-size: 30px;
    box-shadow: 2px 2px 3px #a23f25;
    z-index: 100;
    border: #a23f25;
    transition: 0.5s;
    animation: alternate 2s;
  }

  .btn-backToTop:hover {
    transform: scale(1.1);
  }

  .btn-backToTop:active {
    background-color: #020cd1;
  }

  .arrow-up {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35%;
    margin-bottom: 60%;
    border-bottom: 15px solid white;
  }
</style>


