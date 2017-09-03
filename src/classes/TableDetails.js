import Column from "./Column";
import Helper from "./Helper";

export default class TableDetails {

  // construct a new table
  constructor (id, clientX, clientY){
    this.x = clientX;
    this.y = clientY;
    this.id = id;
    this.name = "";
    this.next_column_id = 1;
    this.columns = [
      this.addDefaultColumn()
    ];

    return this;
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
      let columnName = new Helper().transformName(column.name);

      if ( columnName == name ) {
        count++;
      }
    }

    return count;
  }
}