export default class Column {

  // construct a new column types
  constructor (id){
    this.id = id;
    this.name = null;
    this.type = 'Integer';
    this.default = null;
    this.auto_increment = false;
    this.nullable = false;
    this.unique = false;
    this.primary_key = false;
    this.formHidden = false;
  }

  // for create a default id column easier
  defaultIdColumn (){
    this.name = 'id';
    this.type = 'Integer';
    this.default = null;
    this.auto_increment = true;
    this.unique = true;
    this.primary_key = true;

    return this;
  }
}