export default class ForeignKeyEvent {
  constructor (columnDetail, table_id, column_id){
    this.columnDetail = columnDetail;
    this.table_id = table_id;
    this.column_id = column_id;
  }
}