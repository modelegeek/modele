<template>
  <div class="sql-table">

    <div class="table-name">
      <p :class="{ hidden: isHidden}" @dblclick="showForm">{{tableDetail.name}}</p>
      <div class="form" :class="{ hidden: isFormHidden}">
        <input type="text" v-model="tableDetail.name" @keyup.enter="submitTableName" v-focus/>
      </div>
    </div>
    <!-- this need to change to component -->
    <div class="columns">
      <p>id integer</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sql-table',
    props: ['tableDetail'],
    data () {
      return {
        isHidden: true,
        isFormHidden: false
      }
    },
    methods: {
      submitTableName: function (e){

        if(this.tableDetail.name == ''){
          alert('table name cannot be empty');
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