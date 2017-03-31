<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <table>
        <sql-table></sql-table>
    </table>
  </div>
</template>

<script>
  import SqlTable from './components/SqlTable'

  export default {
    name: 'app',
    components: {
      SqlTable
    }
  }
</script>
