<template>
  <div class="sidebar">
      <h3>Modele</h3>
    <div>
      <a @click.prevent="createTable" href="#"><i class="fas fa-plus"></i>&nbsp;Create Table</a>
    </div>
    <div>
      <a @click.prevent="saveTable" href="#"><i class="fas fa-upload"></i>&nbsp;Save Table</a>
    </div>
    <div>
      <a @click.prevent="loadTable" href="#"><i class="fas fa-download"></i>&nbsp;Load Table</a>
    </div>
  </div>
</template>

<script>

  import Database from "../classes/Database";
  import ForeignKeys from "../classes/ForeignKey";
  import * as _ from "lodash";
  import "../assets/js/fontawesome-all.min";

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
        var name = 'test';
        var databaseClone = this.database;

        for ( let foreignKey of databaseClone.foreign_keys ) {
          delete foreignKey.from.element;
          delete foreignKey.to.element;
        }

        for ( let table of databaseClone.tables ) {
          for ( let column of table.columns ) {
            delete column.element;
          }
        }
        localStorage.setItem(name, JSON.stringify(databaseClone));
        this.database.reset();

        this.$nextTick(this.loadTable);
        alert('save successfully');
      },
      loadTable: function (){
        let loadDatabase = JSON.parse(localStorage.getItem('test'));
        this.database.reset();
        this.$nextTick(() =>{
          this.database.loadData(loadDatabase);

          let databaseOriginalKey = this.database.foreign_keys;
          this.database.foreign_keys = [];

          for ( let foreignKey of databaseOriginalKey ) {

            let fromColumn = this.database.getTableColumn(foreignKey.from.table_id, foreignKey.from.column_id);
            let toColumn = this.database.getTableColumn(foreignKey.to.table_id, foreignKey.to.column_id);

            this.$nextTick(function (){
              foreignKey.from.element = fromColumn.element;
              foreignKey.from.element = fromColumn.element;
              foreignKey.to.element = toColumn.element;

              this.database.foreign_keys.push(new ForeignKeys(foreignKey.from, foreignKey.to, foreignKey.color));
            });
          }
        });
      }
    }
  }
</script>