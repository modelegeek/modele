<template>
  <div class="sql-table">

    <div class="table-name">
      <p :class="{ hidden: isHidden}" @dblclick="showForm">{{tableDetail.name}}</p>
      <div class="table-name-form" :class="{ hidden: isFormHidden}">
        <input type="text" v-model="tableDetail.name" @keyup.enter="submitTableName" v-focus/>
      </div>
    </div>
    <!-- this need to change to component -->
    <div class="column">
      <p class="col-md-6 text-left">id</p>
      <p class="col-md-6 text-right">integer</p>
    </div>

    <div class="column">
      <p class="col-md-6 text-left">name</p>
      <p class="col-md-6 text-right">nvachar</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sql-table',
    props: ['tableDetail', 'tables'],
    data () {
      return {
        isHidden: true,
        isFormHidden: false
      }
    },
    methods: {
      submitTableName: function (e){

        let tableName = this.tableDetail.name;
        if ( tableName == '' ) {
          alert('table name cannot be empty');
          return;
        }

        if(this.tables.getSameTableName(tableName) > 1){
          alert('table name cannot be same');
          return;
        }

        this.isHidden = false;
        this.isFormHidden = true;
      },
      showForm: function (){
        this.isHidden = true;
        this.isFormHidden = false;
      }
    }
  }
</script>