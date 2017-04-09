export default class DataType {
  constructor () {
    this.dataTypes = [];
  }

  numberType () {
    this.dataTypes.push({
      name: 'Number',
      types: [
        'Integer',
        'Tinyint',
        'Bigint',
        'Decimal',
        'Numeric'
      ]
    });
  }

  textType () {
    this.dataTypes.push({
      name: 'Text',
      types: [
        'Char',
        'Varchar',
        'Text'
      ]
    })
  }

  dateType () {
    this.dataTypes.push({
      name: 'Date',
      types: [
        'Date',
        'Time',
        'Year',
        'DateTime',
        'Timestamp'
      ]
    })
  }

  getAllType () {
    this.numberType();
    this.textType();
    this.dateType();

    return this.dataTypes;
  }
}