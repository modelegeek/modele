<template>
  <div class="sql-table" :class="{ focus: table.focus}" @click="focusTable">

    <div class="table-name highlight-none" @click.pervent="setForeign" v-draggable="{table: table, database: database}">
      <p v-show="table.form_hidden" @dblclick="showForm">{{table.name}}</p>
      <div class="table-name-form" v-show="table.form_hidden == false">
        <input type="text" v-model="table.name" @keyup.enter="submitTableName" v-focus/>
        <span @click="removeTable"> x </span>
      </div>
    </div>

    <div class="columns">
      <div is="modele-column"
           v-for="(column, index) in table.columns"
           :key="column.id"
           :index="index"
           :table="table"
           :database="database"
           :column="column">
      </div>
    </div>
    <div class="highlight-none" @click.prevent="addColumn">
      <p class="text-center"> + column </p>
    </div>

  </div>
</template>

<script>
  // component
  import Sortable from "sortablejs";
  import ModeleColumn from './ModeleColumn';
  import Table from "../classes/Table";
  import Database from "../classes/Database";

  export default {
    name: 'modele-table',

    props: {
      table: {
        type: Table,
        required: true,
      },
      database: {
        type: Database,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      }
    },

    components: {
      'modele-column': ModeleColumn
    },

    data (){
      return {}
    },

    mounted: function () {
      let el = this.$el.querySelector('.columns');
      let table = this.table;
      let database = this.database;
      let sortable = Sortable.create(el, {
        onEnd: function (evt){
          table.reindex(evt, table);
          database.redrawForeignKeys();
        },
      });
    },

    methods: {
      setForeign: function (){
        if ( this.database.foreign_broadcasting ) {
          this.table.setForeignKey(this);
        }
      },

      submitTableName: function (){
        let tableName = this.table.name;

        if ( tableName == '' ) {
          alert('table name cannot be empty');
          return;
        } else if ( this.database.getSameTableName(tableName) > 1 ) {
          alert('Table cannot have same column name');
          return;
        }

        this.table.form_hidden = true;
      },

      showForm: function (){
        this.table.form_hidden = false;
      },

      addColumn: function (){
        this.table.addColumn();
      },

      focusTable: function (){
        this.database.defocusAllTables();
        this.table.focus = true;
      },

      removeTable: function (){
        this.database.removeTable(this.index);
      }
    }
  }
</script>