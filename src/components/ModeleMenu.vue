<template>
  <div class="function-menu">
    <a @click.prevent="createTable" href="#">Create Table</a>
    <a @click.prevent="saveTable" href="#">Save Database</a>
    <a href="#">Load Database</a>
  </div>

</template>

<script>
  import Database from "../classes/Database";

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
        localStorage.setItem('test', JSON.stringify(this.database))
        console.log(localStorage.getItem('test'));
      },
    }
  }

</script>