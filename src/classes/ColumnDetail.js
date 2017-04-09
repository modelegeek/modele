export default class ColumnDetail {

  constructor (){
    this.column = {
      name: null,
      type: 'Integer',
      default: null,
      auto_increment: false,
      nullable: false,
      unique: false,
      primary_key: false,
      formHidden: false,
    }
  }

  defaultIdColumn (){
    this.column.name = 'id';
    this.column.type = 'Integer';
    this.column.default = null;
    this.column.auto_increment = true;
    this.column.unique = true;
    this.column.primary_key = true;

    return this.column;
  }

  newColumn (){
    console.log(this.column);
    return this.column;
  }

}
