<template>
  <div id="app" @click="generateTable">
    <svg class="line-svg"></svg>
    <div is="sql-table"
         v-for="(tableDetail, index) in tableDetails"
         :tableDetail="tableDetail"
         :style="{top: tableDetail.top + 'px' , left: tableDetail.left + 'px' }"
    ></div>
  </div>
</template>

<script>
  import SqlTable from './components/SqlTable';

  export default {
    name: 'app',
    components: {
      SqlTable
    },
    data(){
      return {
        tableDetails: [],
      }
    },
    methods: {
      generateTable: function (e){
        var tableObject = {};
        tableObject.top = event.clientY;
        tableObject.left = event.clientX;
        tableObject.name = 'Generated Name';

        this.tableDetails.push(tableObject);
      }
    }
  }
</script>
