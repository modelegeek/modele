<template>
  <div class="sql-table" v-draggable="{tableDetail: tableDetail, database: database}">

    <div class="table-name highlight-none" @click.pervent="tableLinkForeign">
      <p :class="{ hidden: isHidden}" @dblclick="showForm">{{tableDetail.name}}</p>
      <div class="table-name-form" :class="{ hidden: isFormHidden}">
        <input type="text" v-model="tableDetail.name" @keyup.enter="submitTableName" v-focus/>
        <span @click="removeTable"> X </span>
      </div>
    </div>

    <div is="table-column"
         v-for="(column, index) in tableDetail.columns"
         :key="column.id"
         :index="index"
         :tableDetail="tableDetail"
         :database="database"
         ref="column"
         :columnDetail="column">
    </div>

    <div class="highlight-none" @click.prevent="addColumn">
      <p class="text-center"> + column </p>
    </div>

  </div>
</template>

<script>
  // component
  import Vue from "vue";
  import TableColumn from './TableColumn';
  import ForeignKey from "../interface/ForeignKey";
  import ForeignKeyEvent from "../interface/ForeignKeyEvent";

  export default {
    name: 'sql-table',
    props: [
      'tableDetail',
      'database',
      'index'
    ],
    components: {
      TableColumn
    },
    data (){
      return {
        isHidden: true,
        isFormHidden: false,
      }
    },
    methods: {
      tableLinkForeign: function (){
        let table_id = this.tableDetail.id;

        if ( this.database.foreign_broadcasting ) {
          let column = this.tableDetail.addColumn();

          this.$nextTick(function (){
            let foreignKey = new ForeignKeyEvent(column, table_id)

            Events.$emit('setForeign', foreignKey);
          })
        }
      },
      submitTableName: function (){
        let tableName = this.tableDetail.name;

        if ( tableName == '' ) {
          alert('table name cannot be empty');
          return;
        }

        if ( this.database.getSameTableName(tableName) > 1 ) {
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
        this.tableDetail.addColumn();
      },
      removeTable: function (){
        this.database.removeTable(this.index);
      }
    }
  }
</script>