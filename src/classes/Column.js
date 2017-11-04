export default class Column {

  // construct a new column types
  constructor (id, name = ""){
    this.id = id;
    this.name = name;
    this.type = 'Integer';
    this.default = null;
    this.auto_increment = false;
    this.nullable = false;
    this.unique = false;
    this.primary_key = false;
    this.element = "";
    this.formHidden = false;
    this.foreign = [];
  }

  setName(name){
    this.name = name;
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

  setForeignKey(table_id, column_id){
    let foreignKey = {}
    foreignKey.references = column_id;
    foreignKey.on = table_id;

    this.foreign.push(foreignKey);
  }
}