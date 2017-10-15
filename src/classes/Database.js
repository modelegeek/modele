import TableDetails from "./TableDetails";
import Helper from "./Helper";

export default class Database {

  // init a database constructor
  constructor (tables = [], foreign_keys = []){
    this.tables = tables;
    this.foreign_keys = foreign_keys;
    this.next_table_id = 1;
    this.foreign_broadcasting = null;
  }

  broadcastForeign (){
    this.foreign_broadcasting = true;
  }

  stopBroadcastForeign (){
    this.foreign_broadcasting = false;
  }

  // get all null tables count
  // currently is just for checking only
  getNullTables (){
    let countNull = 0

    for ( let value of this.tables ) {
      if ( value.name == null )
        countNull++;
    }

    return countNull;
  }

  // check the table name with convert into lower case
  getSameTableName (newName){
    let count = 0;

    newName = new Helper().transformName(newName);

    for ( let table of this.tables ) {
      let tableName = new Helper().transformName(table.name);

      if ( tableName == newName ) {
        count++;
      }
    }

    return count;
  }

  // add new table to this database design
  appendTable (){
    if ( this.getNullTables() >= 1 ) {
      alert('please fill in all table name to continue');
      return;
    }

    let table_id = this.next_table_id;

    let tableDetail = new TableDetails(table_id, event.clientX, event.clientY);

    this.next_table_id++;

    this.tables.push(tableDetail);
  }
  appendTableWithButton (){
    if ( this.getNullTables() >= 1 ) {
      alert('please fill in all table name to continue');
      return;
    }

    let table_id = this.next_table_id;

    let tableDetail = new TableDetails(table_id, 0, 0);

    this.next_table_id++;

    this.tables.push(tableDetail);
  }

  // remove the specific table
  removeTable (index){
    if ( window.confirm("Do you really want to delete this table?") ) {
      this.tables.splice(index, 1);
    }
  }

  redrawForeignKeys (){
    for ( let foreignKey of this.foreign_keys ) {
      foreignKey.d = foreignKey.calculateD()
    }
  }

}