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