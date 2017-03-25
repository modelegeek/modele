<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <hello></hello>
    <table>
        <rowgen></rowgen>
        <rowgen></rowgen>
    </table>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import Rowgen from './components/Table'

  export default {
    name: 'app',
    components: {
      Rowgen, Hello
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
