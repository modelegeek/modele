<template>
  <div id="app">
    <sql-table></sql-table>
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
