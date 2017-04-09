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
        <button class="btn primary" @click.pervent="updateColumn">Update</button>
      </div>
    </div>

  </div>
</template>

<script>
  import DataType from '../classes/DataType.js';

  export default {
    name: 'table-column',
    props: ['columnDetail'],
    data(){
      return {
        dataTypes: new DataType().getAllType(),
      }
    },
    methods: {
      updateColumn: function (){
        let column = this.columnDetail;
        if(column.name == null){
          alert('Column name cannot be empty');
          return false;
        }
        this.columnDetail.formHidden = true;
      },
      showColumnForm: function (){
        this.columnDetail.formHidden = false;
      }
    }
  }
</script>
