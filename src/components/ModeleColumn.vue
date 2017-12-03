<template>
  <div class="column-detail-box container-fluid" @click.pervent="linkForeign">
    <div class="row">
      <div :class="{ hidden: column.formHidden == false ? true :false }" @dblclick="showColumnForm" class="highlight-none column col-md-12">
        <p class="col-md-6 text-left">{{column.name}}</p>
        <p class="col-md-6 text-right">{{column.type}}</p>
      </div>
    </div>


    <div class="row form column padding-bottom-10" :class="{ hidden: column.formHidden}">
      <div class="col-md-12 form-group">
        <label class="col-md-4">Name</label>
        <div class="col-md-8">
          <input class="form-control" type="text" v-model="column.name" :value="column.name" @keyup.enter="updateColumn"/>
        </div>
      </div>

      <div class="col-md-12 form-group">
        <label class="col-md-4">Type</label>
        <div class="col-md-8">
          <select class="form-control" v-model="column.type">
            <optgroup :label="dataType.name" v-for="(dataType, index) in dataTypes">
              <option v-for="(type, index) in dataType.types" v-bind:value=type>{{type}}</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div class="col-md-12 form-group">
        <label class="col-md-4">Default</label>
        <div class="col-md-8">
          <input class="form-control" type="text" v-model="column.default" :value="column.default" @keyup.enter="updateColumn"/>
        </div>
      </div>

      <div class="small-row">

        <div class="col-md-6">
          <label class="checkbox">
            <span>A_I</span>
            <input type="checkbox" :checked="column.auto_increment" v-model="column.auto_increment"/>
          </label>
        </div>

        <div class="col-md-6">
          <label class="checkbox">
            <span>N/A</span>
            <input type="checkbox" :checked="column.nullable" v-model="column.nullable"/>
          </label>
        </div>

        <div class="col-md-6">
          <label class="checkbox">
            <span>Unique</span>
            <input type="checkbox" :checked="column.unique" v-model="column.unique"/>
          </label>
        </div>

        <div class="col-md-6">
          <label class="checkbox">
            <span>Primary</span>
            <input type="checkbox" :checked="column.primary_key" v-model="column.primary_key"/>
          </label>
        </div>
      </div>

      <div class="form-group col-md-8 col-md-offset-4 text-right padding-right-15">
        <p>
          <button class="btn btn-link" @click.pervent="removeForeign" v-if="column.foreign.length > 0">Remove Foreign</button>
          <button class="btn btn-link" @click.pervent="setForeign" v-if="!column.foreign.length"> Set Foreign</button>
        </p>

        <button class="btn btn-primary text-light" @click.pervent="updateColumn">Update</button>
        <button class="btn btn-danger" @click.pervent="removeColumn">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
  import DataType from '../classes/DataType.js';
  import Column from "../classes/Column";
  import Table from "../classes/Table";
  import Database from "../classes/Database";

  export default {
    name: 'modele-column',

    props: {
      'column': {
        type: Column,
        required: true,
      },
      'table': {
        type: Table,
        required: true,
      },
      'database': {
        type: Database,
        required: true,
      },
      'index': {
        type: Number,
        required: true,
      }
    },

    data (){
      return {
        dataTypes: new DataType().getAllType(),
      }
    },

    updated: function (){
      this.database.redrawForeignKeys();
    },

    mounted: function (){
      let element = this.$el;

      this.column.element = element;
    },

    methods: {
      updateColumn: function (){
        let column = this.column;
        if ( column.name == '' || column.name == null ) {
          alert('Column name cannot be empty');
          return false;
        } else if ( this.table.getSameColumnName(column.name) >= 1 ) {
          alert('Table cannot have same column name');
          return;
        }

        this.column.formHidden = true;
      },

      showColumnForm: function (){
        this.column.formHidden = false;
      },

      removeColumn: function (){
        this.table.removeColumn(this.index, this.database, this.column.id)
      },

      linkForeign: function (){
        let tableId = this.table.id;

        // set event if the foreign key broadcasting is true
        if ( this.database.foreign_broadcasting ) {
          this.column.setForeignKeyEvent(tableId)
        }
      },

      removeForeign: function (){
        // foreign table_id, column_id
        if ( this.column.length == 0 || this.column.foreign.length == 0 )
          return;

        this.database.removeForeignKey(this.table.id, this.column.id, true, this.column.foreign[0]);
      },

      setForeign: function (){
        let element = this.$el;
        let tableId = this.table.id;
        let tableName = this.table.name;
        let database = this.database;

        // if foreign broadcasting is on will trigger the custom function instead of
        // create a function to broadcast again
        if ( this.database.foreign_broadcasting ) {
          this.column.setForeignKeyEvent(tableId)
        } else {
          this.column.broadcastForeignKeyEvent(element, tableId, tableName, database)
        }
      }
    }
  }
</script>
