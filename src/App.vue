<template>
  <div id="app" @click.alt.prevent="generateTable">

    <svg class="line-svg"></svg>
    <div is="sql-table"
         v-for="(table, index) in tables"
         :tables="tableObject"
         :tableDetail="table"
         :style="{top: table.y + 'px' , left: table.x + 'px' }"
    ></div>
  </div>
</template>

<script>
  import SqlTable from './components/SqlTable';
  import TableDetail from './classes/TableDetail'
  import Tables from './classes/Tables'

  let tableObj = new Tables([])

  export default {
    name: 'app',
    components: {
      SqlTable
    },
    data(){
      return {
        tableObject: tableObj,
        tables: tableObj.getTables()
      }
    },
    methods: {
      generateTable: function (){
        if ( tableObj.getNullTable() >= 1 ) {
          alert('please fill in all table name to continue');
          return;
        }

        let tableDetail = new TableDetail(event.clientX, event.clientY);
        let tableObject = tableDetail.getTableDetail();

        tableObj.pushTable(tableObject);
        this.tables = tableObj.getTables();
      }
    }
  }
</script>
