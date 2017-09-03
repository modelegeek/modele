<template>
  <div id="app" @click.alt.prevent="appendTable">

    <!--<svg class="line-svg"></svg>-->
    <div is="sql-table"
         v-for="(table, index) in database.tables"
         :database="database"
         :tableDetail="table"
         :style="{top: table.y + 'px' , left: table.x + 'px' }"
    ></div>
  </div>
</template>

<script>
  import SqlTable from './components/SqlTable';
  import Database from "./classes/Database";

  let database = new Database();

  export default {
    name: 'app',
    components: {
      SqlTable
    },
    data (){
      return {
        database: database,
      }
    },
    methods: {
      appendTable: function (){
        this.database.appendTable();
      }
    }
  }
</script>