<template>
  <div id="app" @click.alt.prevent="appendTable">

    <svg class="line-svg">
      <path v-for="(foreignKey, index) in database.foreign_keys"
            stroke-width="2"
            :stroke="foreignKey.color"
            :d="foreignKey.d"
            fill="none"
            ></path>
    </svg>

    <table-menu v-on:createTable="appendTableWithButton" :database="database" style="z-index: 1"></table-menu>

    <div is="sql-table"
         v-for="(table, index) in database.tables"
         :database="database"
         :index="index"
         :key="table.id"
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