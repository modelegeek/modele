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
