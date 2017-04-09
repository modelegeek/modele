<template>
  <div class="sql-table">

    <div class="table-name highlight-none">
      <p :class="{ hidden: isHidden}" @dblclick="showForm">{{tableDetail.name}}</p>
      <div class="table-name-form" :class="{ hidden: isFormHidden}">
        <input type="text" v-model="tableDetail.name" @keyup.enter="submitTableName" v-focus/>
      </div>
    </div>
    <!-- this need to change to component -->
    <div is="table-column"
         v-for="(column, index) in tableDetail.columns"
         :columnDetail="column">
    </div>

    <div class="highlight-none" @click.prevent="addColumn">
      <p class="text-center"> + column </p>
    </div>

  </div>
</template>

<script>
  // class
  import ColumnDetail from '../classes/ColumnDetail'
  import TableDetail from '../classes/TableDetail'

  // component
  import TableColumn from './TableColumn';

  export default {
    name: 'sql-table',
    props: ['tableDetail', 'tables'],
    components: {
      TableColumn
    },
    data () {
      return {
        isHidden: true,
        isFormHidden: false,
      }
    },
    methods: {
      submitTableName: function (e){

        let tableName = this.tableDetail.name;
        if ( tableName == '' ) {
          alert('table name cannot be empty');
          return;
        }

        if ( this.tables.getSameTableName(tableName) > 1 ) {
          alert('table name cannot be same');
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
        let newColumn = new ColumnDetail().newColumn();
        // check if there is null column in this table
        let countNullName = new TableDetail(this.tableDetail).checkAllNullColumn();
        if ( countNullName >= 1 ) {
          alert('this table have null column name');
          return false;
        }
        // hidden all column
        new TableDetail(this.tableDetail).hideAllColumn();
        this.tableDetail.columns.push(newColumn);
      }
    }
  }
</script>