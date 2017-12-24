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

    <table-menu :database="database"></table-menu>

    <div is="modele-table"
         v-for="(table, index) in database.tables"
         :database="database"
         :index="index"
         :key="table.id"
         :table="table"
         :style="{top: table.y + 'px' , left: table.x + 'px' }"
    ></div>
  </div>
</template>

<script>
  import ModeleTable from './components/ModeleTable';
  import TableMenu from './components/ModeleMenu';
  import Database from "./classes/Database";

  let database = new Database();

  export default {
    name: 'database',
    components: {
      'modele-table': ModeleTable,
      'table-menu': TableMenu,
    },
    data (){
      return {
        database: database,
      }
    },

    methods: {
      appendTable: function (){
        // true mean it have provide a position
        this.database.appendTable(true);
      }
    }
  }
</script>