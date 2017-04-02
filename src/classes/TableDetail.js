export default class TableDetail {

  constructor (corX, corY){
    this.tableDetail = {
      x: corX,
      y: corY,
      name: null
    }
  }

  getTableDetail (){
    return this.tableDetail;
  }

}
