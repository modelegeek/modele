export default class ForeignKeyEventInterface {
  constructor (columnDetail, table_id, column_id){
    this.columnDetail = columnDetail;
    this.table_id = table_id;
    this.column_id = column_id;
    this.set_from_table = false;
  }

  setFromTable (){
    this.set_from_table = true;
  }
}