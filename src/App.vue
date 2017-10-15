<template>
  <div id="app" @click.alt.prevent="appendTable">

    <table-menu v-on:createTable="appendTableWithButton" :database="database"></table-menu>
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
  import TableMenu from './components/TableMenu';
  import Database from "./classes/Database";

  let database = new Database();

  export default {
    name: 'app',
    components: {
      SqlTable,
      TableMenu,
    },
    data (){
      return {
        database: database,
      }
    },
    methods: {
      appendTable: function (){
        this.database.appendTable();
      },
      appendTableWithButton: function (){
        this.database.appendTableWithButton();
      }
    }
  }
</script>