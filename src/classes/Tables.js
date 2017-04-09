export default class Tables{

  constructor (data){
    this.tables = data;
  }

  pushTable ($table){
    this.tables.push($table);
  }

  getTables (){
    return this.tables;
  }

  getNullTable(){
    let countNull = 0

    for (let value of this.tables) {
      if(value.name == null)
        countNull++;
    }

    return countNull;
  }

  getSameTableName(name){
    let count = 0;

    for (let value of this.tables) {
      if(value.name == name){
        count++;
      }
    }

    return count;
  }
}