import ColumnDetail from "./ColumnDetail";

export default class TableDetail {

  constructor (tableDetail = {}){
    this.tableDetail = tableDetail;
  }

  createNewTable (corX, corY){
    this.tableDetail = {
      x: corX,
      y: corY,
      name: null,
      columns: [
        new ColumnDetail().defaultIdColumn()
      ]
    }

    return this;
  }

  getTableDetail (){
    return this.tableDetail;
  }

  checkAllNullColumn (){
    let columns = this.tableDetail.columns
    let countNull = 0;

    // check all column name
    for ( let column of columns ) {
      if ( column.name == null )
        countNull++;
    }

    return countNull;
  }

  hideAllColumn (){
    let columns = this.tableDetail.columns

    // hidden all column
    for ( let column of columns ) {
      column.formHidden = true
    }
  }
}
