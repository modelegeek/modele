import Table from "./Table";
import Helper from "./Helper";
import _ from "lodash";

export default class Database {

  // init a database constructor
  constructor (tables = [], foreign_keys = []){
    this.tables = tables;
    this.foreign_keys = foreign_keys;

    if ( tables.length >= 1 ) {
      this.assignTableClass(tables);
    }

    if ( foreign_keys.length >= 1 ) {
      this.assignForeignKeyClass(foreign_keys);
    }

    this.next_table_id = 1;
    this.foreign_broadcasting = null;
  }

  assignTableClass (tables){
    for ( let table of tables ) {
      let tableObj = new Table(table.id, table.x, table.y, false, table.foreign_color);
      tableObj.setTableData(table);

      this.tables.push(tableObj);
    }
  }

  // set broadcasting to true as a flag
  broadcastForeign (){
    this.foreign_broadcasting = true;
  }

  // stop broadcasting and remove the event
  stopBroadcastForeign (foreignKeyEvent){
    this.foreign_broadcasting = false;

    // close the event in it successful setup
    Events.$off(['setForeign', foreignKeyEvent]);
  }

  // get all null tables count
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
  appendTable (position = false){
    if ( this.getNullTables() >= 1 ) {
      alert('please fill in all table name to continue');
      return;
    }

    let table_id = this.next_table_id;

    let tableDetail = new Table(table_id, 0, 0);

    if ( position ) {
      tableDetail = new Table(table_id, event.clientX, event.clientY);
    }

    this.next_table_id++;

    this.tables.push(tableDetail);
  }

  // remove the specific table
  removeTable (index){
    if ( window.confirm("Do you really want to delete this table?") ) {
      this.removeForeignKey(this.tables[index].id);
      this.tables.splice(index, 1);
    }
  }

  // redraw foreign key
  redrawForeignKeys (){
    for ( let foreignKey of this.foreign_keys ) {
      foreignKey.d = foreignKey.calculateD()
    }
  }

  // remove this foreign key
  removeForeignKey (tableId, columnId, single = false, foreignKey = null){
    // foreach every table
    if ( single ) {
      this.removeSingleForeignKey(tableId, columnId, foreignKey);
    } else {
      this.getAllAndRemoveRelatedKey(tableId, columnId);
    }
  }

  // get all related key from the table and column id
  getAllAndRemoveRelatedKey (tableId, columnId = null){
    let foreignKeyToRemove = [];
    let foreignKeys = this.foreign_keys;

    // backward index cause the id
    for ( let i = foreignKeys.length - 1; i >= 0; i -= 1 ) {
      let foreignKeyFrom = foreignKeys[i].from;
      let foreignKeyTo = foreignKeys[i].to;

      let conditionFrom = foreignKeyFrom.table_id == tableId;
      let conditionTo = foreignKeyTo.table_id == tableId;

      if ( columnId != null ) {
        conditionFrom = foreignKeyFrom.column_id == columnId && foreignKeyFrom.table_id == tableId;
        conditionTo = foreignKeyTo.column_id == columnId && foreignKeyTo.table_id == tableId;
      }

      if ( conditionFrom || conditionTo ) {
        let tableFrom = foreignKeyFrom.table_id
        let columnFrom = foreignKeyFrom.column_id
        foreignKeyToRemove.push([tableFrom, columnFrom]);

        let tableTo = foreignKeyTo.table_id
        let columnTo = foreignKeyTo.column_id
        foreignKeyToRemove.push([tableTo, columnTo])

        this.findAndRemoveForeignKey(tableFrom, tableTo, columnFrom, columnTo);
        this.findAndRemoveForeignKey(tableTo, tableFrom, columnTo, columnFrom);

        this.foreign_keys.splice(i, 1);
      }
    }
    return foreignKeyToRemove;
  }

  // find and remove certain foreign key
  findAndRemoveForeignKey (tableId, foreignTableId, columnId = null, foreignColumnId = null){
    let column = this.getTableColumn(tableId, columnId);

    let foreignKeyIndex = _.findIndex(column.foreign, { 'references': foreignColumnId, 'on': foreignTableId });

    if ( foreignKeyIndex >= 0 )
      column.foreign.splice(foreignKeyIndex, 1);
  }

  loadData (loadedData){
    this.assignTableClass(loadedData.tables);
    this.foreign_keys = loadedData.foreign_keys;
    this.next_table_id = loadedData.next_table_id;
  }

  reset (){
    this.tables = [];
    this.foreign_keys = [];
  }

  getTableColumn (tableId, columnId){
    let table = _.find(this.tables, function (table){
      return table.id == tableId;
    });

    let column = _.find(table.columns, function (column){
      return column.id == columnId;
    });

    return column;
  }

  removeSingleForeignKey (tableId, columnId, foreignKey){
    // references = column id; on = table id
    let matchesKeyIndex = _.findIndex(this.foreign_keys, function (fk){
      return fk.from.column_id == foreignKey.references &&
        fk.from.table_id == foreignKey.on &&
        fk.to.column_id == columnId &&
        fk.to.table_id == tableId;
    });

    if ( matchesKeyIndex >= 0 ) {
      this.foreign_keys.splice(matchesKeyIndex, 1);
    }

    this.findAndRemoveForeignKey(tableId, foreignKey.on, columnId, foreignKey.references);
  }
}