<template>
  <div class="sql-table">
    <td>{{tableDetail.name}}</td>
  </div>
</template>

<script>
  export default {
    name: 'sql-table',
    props: ['tableDetail'],
    data () {
      return {}
    }
  }
</script>