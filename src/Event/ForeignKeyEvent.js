import * as _ from "lodash";
import ForeignKey from "../classes/ForeignKey";
import ForeignKeyInterface from "../interface/ForeignKeyInterface";

export default class ForeignKeyEvent {

  constructor (foreignKeyEvent){
    this.column = foreignKeyEvent.columnDetail;
    this.column_id = foreignKeyEvent.column_id;
    this.table_id = foreignKeyEvent.table_id;
    this.set_from_table = foreignKeyEvent.set_from_table;
  }

  checkIfIsSelf (tableId, columnId){
    // is this is self
    let conditionOne = this.table_id == tableId && this.column.id == columnId;

    // if this is the same table
    let conditionTwo = this.table_id == tableId;

    // if condition one or condition two meet then should not be able to link foreign key
    if ( conditionOne || conditionTwo ) {
      return false;
    }

    return true;
  }

  checkIfHaveSameForeignKey (columnId, tableId, database){
    // find if this column have this foreign key set
    let similarForeignKey = _.find(this.column.foreign, { 'references': columnId, 'on': tableId });

    // if there is the same key will prompt error
    if ( similarForeignKey ) {
      alert("Foreign key already set");
      database.stopBroadcastForeign(this);
      return false;
    }

    // if there is the same key will prompt error
    if ( this.column.foreign.length >= 1 ) {
      alert("This column already have foreign key set");
      database.stopBroadcastForeign(this);
      return false;
    }

    return true;
  }

  // set foreign key event
  setForeign (element, database, tableId, tableName, columnId){
    let column = this.column;

    if ( this.set_from_table ) {
      column.setName(tableName + '_id');
    }

    // set up a foreign key object (child key)
    let toForeignKey = new ForeignKeyInterface(column.element, 'to', this.table_id, column.id);

    // parent key
    let fromForeignKey = new ForeignKeyInterface(element, 'from', tableId, columnId);

    // set the foreign key in this column to extracting the foreign key later in migration file
    column.insertForeignKey(tableId, columnId);

    // push foreign key in the top-est level in the ecosystem (for drawing the line)
    database.foreign_keys.push(new ForeignKey(fromForeignKey, toForeignKey));

    // stop broadcasting flag the foreign key
    database.stopBroadcastForeign();
  }

}