<template>
  <div class="sidebar">
    <ul>
      <li><a @click.prevent="createTable" href="#">Create Table></a></li>
      <li><a @click.prevent="saveTable" href="#">Save Database></a></li>
      <li><a @click.prevent="loadTable" href="#">Load Database></a></li>
    </ul>
  </div>

</template>

<script>

  import Database from "../classes/Database";
  import ForeignKeys from "../classes/ForeignKey";
  import * as _ from "lodash";

  export default {
    name: 'table-menu',

    props: {
      database: {
        type: Database
      }
    },

    data (){
      return {}
    },

    methods: {
      createTable: function (){
        this.database.appendTable();
      },
      saveTable: function (){
        var databaseClone = this.database.cloneDatabase();

        for ( let foreignKey of databaseClone.foreign_keys ) {
          delete foreignKey.from.element;
          delete foreignKey.to.element;
        }

        for ( let table of databaseClone.tables ) {
          for ( let column of table.columns ) {
            delete column.element;
          }
        }

        localStorage.setItem('test', JSON.stringify(databaseClone));
      },
      loadTable: function (){
        let loadDatabase = JSON.parse(localStorage.getItem('test'));
        this.database.loadData(loadDatabase);

        let databaseOriginalKey = this.database.foreign_keys;
        this.database.foreign_keys = [];

        for ( let foreignKey of databaseOriginalKey ) {

          let fromColumn = this.database.getTableColumn(foreignKey.from.table_id, foreignKey.from.column_id);
          let toColumn = this.database.getTableColumn(foreignKey.to.table_id, foreignKey.to.column_id);

          this.$nextTick(function (){
            foreignKey.from.element = fromColumn.element;
            foreignKey.to.element = toColumn.element;

            this.database.foreign_keys.push(new ForeignKeys(foreignKey.from, foreignKey.to));
          });
        }
      }
    }
  }
</script>