import ForeignKeyEventInterface from "../interface/ForeignKeyEventInterface";
import ForeignKeyEvent from "../Event/ForeignKeyEvent";

export default class Column {

  // construct a new column types
  constructor (id, name = ""){
    this.id = id;
    this.name = name;
    this.type = 'Integer';
    this.default = null;
    this.auto_increment = false;
    this.nullable = false;
    this.unique = false;
    this.primary_key = false;
    this.element = "";
    this.formHidden = false;
    this.foreign = [];
  }

  setData (column){
    this.type = column.type;
    this.default = column.default;
    this.auto_increment = column.auto_increment;
    this.nullable = column.nullable;
    this.unique = column.unique;
    this.primary_key = column.primary_key;
    this.element = column.element;
    this.formHidden = column.formHidden;
    this.foreign = column.foreign;
  }

  setName (name){
    this.name = name;
  }

  // for create a default id column easier
  defaultIdColumn (){
    this.name = 'id';
    this.type = 'Integer';
    this.default = null;
    this.auto_increment = true;
    this.unique = true;
    this.primary_key = true;

    return this;
  }

  // insert foreign key in this column
  insertForeignKey (table_id, column_id){
    let foreignKey = {}
    foreignKey.references = column_id;
    foreignKey.on = table_id;

    this.foreign.push(foreignKey);
  }

  // trigger set foreign event
  setForeignKeyEvent (tableId){
    let foreignKey = new ForeignKeyEventInterface(this, tableId)

    Events.$emit('setForeign', foreignKey);
  }

  // broadcast foreign key event
  broadcastForeignKeyEvent (element, tableId, tableName, database){
    let columnId = this.id;

    // if parent key is not primary key or unique key will return error
    if ( this.primary_key == false && this.unique == false ) {
      alert('Column must be primary key to be a parent key');

      return false;
    }

    // listening method for setForeign key method
    Events.$on('setForeign', function (foreignKeyEvent){
      let foreignKeyEventClass = new ForeignKeyEvent(foreignKeyEvent);

      if ( !foreignKeyEventClass.checkIfIsSelf(tableId, columnId) ) return;

      if ( !foreignKeyEventClass.checkIfHaveSameForeignKey(columnId, tableId, database) ) return;

      foreignKeyEventClass.setForeign(element, database, tableId, tableName, columnId);
    })

    database.broadcastForeign();
  }

}