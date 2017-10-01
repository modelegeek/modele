<template>
  <div class="column-detail-box container-fluid">
    <div class="row">
      <div :class="{ hidden: columnDetail.formHidden == false ? true :false }" @dblclick="showColumnForm" class="highlight-none column col-md-12">
        <p class="col-md-6 text-left">{{columnDetail.name}}</p>
        <p class="col-md-6 text-right">{{columnDetail.type}}</p>
      </div>
    </div>


    <div class="row form column padding-bottom-10" :class="{ hidden: columnDetail.formHidden}">
      <div class="col-md-12 form-group">
        <label class="col-md-4">Name</label>
        <div class="col-md-8">
          <input class="form-control" type="text" v-model="columnDetail.name" :value="columnDetail.name" @keyup.enter="updateColumn"/>
        </div>
      </div>


      <div class="col-md-12 form-group">
        <label class="col-md-4">Type</label>
        <div class="col-md-8">
          <select class="form-control" v-model="columnDetail.type">
            <optgroup :label="dataType.name" v-for="(dataType, index) in dataTypes">
              <option v-for="(type, index) in dataType.types" v-bind:value=type>{{type}}</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div class="col-md-12 form-group">
        <label class="col-md-4">Default</label>
        <div class="col-md-8">
          <input class="form-control" type="text" v-model="columnDetail.default" :value="columnDetail.default" @keyup.enter="updateColumn"/>
        </div>
      </div>

      <div class="small-row col-md-8 col-md-offset-4">
        <div class="col-md-6">
          A_I <input type="checkbox" :checked="columnDetail.auto_increment" v-model="columnDetail.auto_increment"/>
        </div>

        <div class="col-md-6">
          N/A <input type="checkbox" :checked="columnDetail.nullable" v-model="columnDetail.nullable"/>
        </div>

        <div class="col-md-6">
          Unique <input type="checkbox" :checked="columnDetail.unique" v-model="columnDetail.unique"/>
        </div>

        <div class="col-md-6">
          Primary <input type="checkbox" :checked="columnDetail.primary_key" v-model="columnDetail.primary_key"/>
        </div>
      </div>

      <div class="form-group col-md-8 col-md-offset-4 text-right padding-right-15">
        <button class="btn primary" @click.pervent="setForeign">Foreign</button>
        <button class="btn primary" @click.pervent="removeColumn">Delete</button>
        <button class="btn primary" @click.pervent="updateColumn">Update</button>
      </div>
    </div>

  </div>
</template>

<script>
  import DataType from '../classes/DataType.js';
  import ForeignKey from "../classes/ForeignKey";
  import ForeignKeys from "../classes/ForeignKeys";
  import Vue from "vue";

  // make a new vue just for broadcasting & listening event
  var Events = new Vue({});

  export default {
    name: 'table-column',
    props: [
      'columnDetail',
      'tableDetail',
      'database',
      'index'
    ],
    data (){
      return {
        dataTypes: new DataType().getAllType(),
      }
    },
    updated: function () {
      this.database.redrawForeignKeys();
    },
    methods: {
      updateColumn: function (){
        let column = this.columnDetail;
        if ( column.name == '' || column.name == null ) {
          alert('Column name cannot be empty');
          return false;
        }

        if ( this.tableDetail.getSameColumnName(column.name) >= 1 ) {
          alert('Table cannot have same column name');
          return;
        }

        this.columnDetail.formHidden = true;

      },
      showColumnForm: function (){
        this.columnDetail.formHidden = false;
      },
      removeColumn: function (){
        this.tableDetail.removeColumn(this.index)
      },
      setForeign: function (){
        let element = this.$el;
        let table_id = this.tableDetail.id;
        let column_id = this.columnDetail.id;
        let columnDetail = this.columnDetail;
        let databaseDetail = this.database;

        // if foreign broadcasting is on will trigger the custom function instead of
        // create a function to broadcast again
        if ( this.database.foreign_broadcasting) {

          let foreignKey = new ForeignKey(element, 'to', table_id, column_id)
          Events.$emit('setForeign', foreignKey);
          this.database.stopBroadcastForeign();

        } else {

          Events.$once('setForeign', function (foreignKey){
            // this is for testing only
            alert('foreign set from table ' + table_id);

            let fromForeignKey = new ForeignKey(element, 'from', table_id, column_id)

            columnDetail.setForeignKey(foreignKey.table_id, foreignKey.column_id);

            databaseDetail.foreign_keys.push(new ForeignKeys(fromForeignKey, foreignKey));
          })

          this.database.broadcastForeign();

        }
      }
    }
  }
</script>
