<template>
  <div class="sql-table" style="position: absolute">

    <div class="table-name highlight-none" @click.pervent="setForeign" v-draggable="{table: table, database: database}">
      <p :class="{ hidden: isHidden}" @dblclick="showForm">{{table.name}}</p>
      <div class="table-name-form" :class="{ hidden: isFormHidden}">
        <input type="text" v-model="table.name" @keyup.enter="submitTableName" v-focus/>
        <span @click="removeTable"> x </span>
      </div>
    </div>

    <div id="columns">
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
  import Vue from "vue";
  import Sortable from "sortablejs";
  import ModeleColumn from './ModeleColumn';

  import ForeignKey from "../interface/ForeignKeyInterface";
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
      return {
        isHidden: true,
        isFormHidden: false,
      }
    },
    mounted: function (){
      var el = document.getElementById('columns');
      var sortable = Sortable.create(el);
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

        this.isHidden = false;
        this.isFormHidden = true;
      },

      showForm: function (){
        this.isHidden = true;
        this.isFormHidden = false;
      },

      addColumn: function (){
        this.table.addColumn();
      },

      removeTable: function (){
        this.database.removeTable(this.index);
      }
    }
  }
</script>