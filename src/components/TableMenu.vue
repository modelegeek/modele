<template>
  <div class="function-menu">
    <a @click.prevent="createTable" href="#">Create Table</a>
    <a @click.prevent="saveTable" href="#">Save Database</a>
    <a href="#">Load Database</a>
  </div>

</template>

<script>
  export default {
    name: 'table-menu',
    props: ['database'],
    components: {},
    data (){
      return {
        isHidden: false,
        isFormHidden: false,
      }
    },
    methods: {
      createTable: function (){
        this.$emit('createTable')
      },
      saveTable: function(){
        localStorage.setItem('test',JSON.stringify(this.database))
        console.log(localStorage.getItem('test'));
      },
    }
  }

</script>