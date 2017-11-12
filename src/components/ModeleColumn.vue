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

      <div class="small-row col-md-8 col-md-offset-4">
        <div class="col-md-6">
          A_I <input type="checkbox" :checked="column.auto_increment" v-model="column.auto_increment"/>
        </div>

        <div class="col-md-6">
          N/A <input type="checkbox" :checked="column.nullable" v-model="column.nullable"/>
        </div>

        <div class="col-md-6">
          Unique <input type="checkbox" :checked="column.unique" v-model="column.unique"/>
        </div>

        <div class="col-md-6">
          Primary <input type="checkbox" :checked="column.primary_key" v-model="column.primary_key"/>
        </div>
      </div>

      <div class="form-group col-md-8 col-md-offset-4 text-right padding-right-15">
        <button class="btn primary" @click.pervent="removeForeign" v-if="column.foreign.length > 0">Remove Foreign</button>
        <button class="btn primary" @click.pervent="setForeign">Foreign</button>
        <button class="btn primary" @click.pervent="removeColumn">Delete</button>
        <button class="btn primary" @click.pervent="updateColumn">Update</button>
      </div>
    </div>

  </div>
</template>

<script>
  import DataType from '../classes/DataType.js';
  import ForeignKey from "../interface/ForeignKey";
  import ForeignKeys from "../classes/ForeignKeys";
  import ForeignKeyEvent from "../interface/ForeignKeyEvent";
  import _ from "lodash";
  import Column from "../classes/Column";
  import Table from "../classes/Table";
  import Database from "../classes/Database";

  export default {
    name: 'modele-column',

    props: {
      'column':{
        type: Column,
        required: true,
      },
      'table':{
        type: Table,
        required: true,
      },
      'database':{
        type: Database,
        required: true,
      },
      'index':{
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
        }

        if ( this.table.getSameColumnName(column.name) >= 1 ) {
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
        let table_id = this.table.id;

        // if foreign broadcasting is on will trigger the custom function instead of
        // create a function to broadcast again
        if ( this.database.foreign_broadcasting ) {
          let foreignKey = new ForeignKeyEvent(this.column, table_id)

          Events.$emit('setForeign', foreignKey);
        }
      },
      removeForeign: function (){
        // foreign table_id, column_id
        if ( this.column.length == 0 || this.column.foreign.length == 0 )
          return;

        // todo bug
        this.database.removeForeignKey(this.table.id, this.column.id, true, this.column.foreign[0]);
      },
      setForeign: function (){
        let element = this.$el;
        let table_id = this.table.id;
        let table_name = this.table.name;
        let column_id = this.column.id;
        let databaseDetail = this.database;

        // if foreign broadcasting is on will trigger the custom function instead of
        // create a function to broadcast again
        if ( this.database.foreign_broadcasting ) {

          // set up a foreign key object
          let foreignKey = new ForeignKeyEvent(this.column, table_id)

          // return setForeign method
          Events.$emit('setForeign', foreignKey);

        } else {

          // if parent key is not primary key or unique key will return error
          if ( this.column.primary_key == false && this.column.unique == false ) {
            alert('Column must be primary key to be a parent key');

            return;
          }

          // listening method for setForeign key method
          Events.$on('setForeign', function (foreignKeyEvent){

            // column detail
            let columnForeignDetail = foreignKeyEvent.columnDetail;

            // is this is self
            let conditionOne = foreignKeyEvent.table_id == table_id && columnForeignDetail.id == column_id;

            // if this is the same table
            let conditionTwo = foreignKeyEvent.table_id == table_id;

            // if condition one or condition two meet then should not be able to link foreign key
            if ( conditionOne || conditionTwo ) {
              return;
            }

            // find if this column have this foreign key set
            let similarForeignKey = _.find(columnForeignDetail.foreign, { 'references': column_id, 'on': table_id });

            // if there is the same key will prompt error
            if ( similarForeignKey ) {
              alert("Foreign key already set");
              databaseDetail.stopBroadcastForeign(foreignKeyEvent);
              return;
            }

            // if there is the same key will prompt error
            if ( columnForeignDetail.foreign.length >= 1 ) {
              alert("This column already have foreign key set");
              databaseDetail.stopBroadcastForeign(foreignKeyEvent);
              return;
            }

            if ( foreignKeyEvent.set_from_table ) {
              columnForeignDetail.setName(table_name + '_id');
            }

            // set up a foreign key object (child key)
            let toForeignKey = new ForeignKey(columnForeignDetail.element, 'to', foreignKeyEvent.table_id, columnForeignDetail.id);

            // parent key
            let fromForeignKey = new ForeignKey(element, 'from', table_id, column_id);

            // set the foreign key in this column to extracting the foreign key later in migration file
            columnForeignDetail.setForeignKey(table_id, column_id);

            // push foreign key in the top-est level in the ecosystem (for drawing the line)
            databaseDetail.foreign_keys.push(new ForeignKeys(fromForeignKey, toForeignKey));

            // stop broadcasting flag the foreign key
            databaseDetail.stopBroadcastForeign();
          })

          this.database.broadcastForeign();
        }
      }
    }
  }
</script>
