import Column from "./Column";
import Helper from "./Helper";
import ForeignKeyEventInterface from "../interface/ForeignKeyEventInterface";

export default class Table {

  // construct a new table
  constructor (id, clientX, clientY, defaultCol = true, color = null){
    if ( color == null )
      color = "#" + ((1 << 24) * Math.random() | 0).toString(16);

    this.x = clientX;
    this.y = clientY;
    this.id = id;
    this.focus = true;
    this.name = "";
    this.foreign_color = color;
    this.form_hidden = false;
    this.next_column_id = 1;
    this.columns = [];
    if ( defaultCol ) {
      this.columns = [
        this.addDefaultColumn()
      ];
    }

    return this;
  }

  setTableData (table){
    this.name = table.name;
    this.next_column_id = table.next_column_id;
    this.form_hidden = table.form_hidden;
    this.focus = table.focus;
    this.setColumn(table.columns);
  }

  setColumn (columns){
    for ( let column of columns ) {
      let columnObj = new Column(column.id, column.name);
      columnObj.setData(column);

      this.columns.push(columnObj);
    }
  }

  // add column to this current table with id increment
  addColumn (){

    // get all null column count if equal or more then 1 will return alert
    if ( this.getAllNullColumn() >= 1 ) {
      alert('please fill in all column name to continue');
      return;
    }

    // get current column id count
    let column_id = this.next_column_id;

    // create a new column with the id get from above
    let column = new Column(column_id);

    // increment the column id for the next column
    this.next_column_id++

    // hide all column form to minimize the column detail
    // aka from form to only show column name and type of column
    this.hideAllColumn()

    // push into this table column
    this.columns.push(column)

    return column;
  }

  // to add a default id primary key to the newly created table
  addDefaultColumn (){
    let column_id = this.next_column_id;

    let column = new Column(column_id).defaultIdColumn();

    this.next_column_id++

    return column
  }

  // hide all column to name ane type only instead of a form
  hideAllColumn (){
    let columns = this.columns

    // hidden all column
    for ( let column of columns ) {
      column.formHidden = true
    }
  }

  // get all null column count
  // currently is for checking purposes only
  getAllNullColumn (){
    let columns = this.columns
    let countNull = 0;

    // check all column name
    for ( let column of columns ) {
      if ( column.name == null )
        countNull++;
    }

    return countNull;
  }

  // get the total count of same column name
  getSameColumnName (name){
    let count = 0;

    name = new Helper().transformName(name);

    for ( let column  of this.columns ) {
      if ( column.name == "" )
        return false;

      let columnName = new Helper().transformName(column.name);

      if ( columnName == name && column.formHidden === true ) {
        count++;
      }
    }

    return count;
  }

  // remove column and also foreign key
  removeColumn (index, database, column_id){
    database.removeForeignKey(this.id, column_id);

    this.columns.splice(index, 1);
  }

  // set foreign key with table
  setForeignKey (vue){
    let column = this.addColumn();
    let tableId = this.id;

    vue.$nextTick(function (){
      let foreignKey = new ForeignKeyEventInterface(column, tableId);

      // set a flag to let column know this new column is needed to append table name
      foreignKey.setFromTable();

      Events.$emit('setForeign', foreignKey);
    })
  }

  reindex (evt, table){
    let movedData = table.columns[evt.oldIndex];
    if ( evt.oldIndex > evt.newIndex ) {
      for ( let i = evt.oldIndex; i > evt.newIndex; i-- ) {
        table.columns[i] = table.columns[i - 1]
      }
      table.columns[evt.newIndex] = movedData;
    }
    else {
      for ( let i = evt.oldIndex; i < evt.newIndex; i++ ) {
        table.columns[i] = table.columns[i + 1]
      }
      table.columns[evt.newIndex] = movedData;
    }

  }
}