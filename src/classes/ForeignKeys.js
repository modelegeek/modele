export default class VisualiseForeignKeys {

  constructor (from, to){
    this.from = from;
    this.to = to;
    this.color = '#000'
    this.d = this.calculateD()
  }

  calculateD (){
    let fromElement = this.from.element;
    let toElement = this.to.element;

    let rightFromElement = fromElement.getBoundingClientRect().right
    let leftFromElement = fromElement.getBoundingClientRect().left + window.scrollX;
    let topFromElement = fromElement.getBoundingClientRect().top + window.scrollY;
    // `topFromElement` only get the most top position but we need to get the center of that position
    // so we get the total height of that (element - 2) then divide by 2 then we will get the total sum we need to add to Y
    // why minus 2 ? cause the width of the line is fixed at 2
    let FromElementY = topFromElement + ((fromElement.offsetHeight - 2) / 2);

    let rightToElement = toElement.getBoundingClientRect().right
    let leftToElement = toElement.getBoundingClientRect().left + window.scrollX;
    let topToElement = toElement.getBoundingClientRect().top + window.scrollY;
    let ToElementY = topToElement + ((toElement.offsetHeight - 2) / 2);

    let fromRightToLeftRange = rightFromElement - leftToElement;
    let fromLeftToRightRange = leftFromElement - rightToElement;

    fromRightToLeftRange = Math.abs(fromRightToLeftRange);
    fromLeftToRightRange = Math.abs(fromLeftToRightRange);

    let pointA = null;
    let pointB = null;

    if ( fromRightToLeftRange <= fromLeftToRightRange ) {
      pointA = { x: rightFromElement, y: FromElementY }
      pointB = { x: leftToElement, y: ToElementY }
    } else {
      pointA = { x: rightToElement, y: ToElementY }
      pointB = { x: leftFromElement, y: FromElementY }
    }

    return this.assignCubicFunction(pointA, pointB)
  }

  assignCubicFunction (pointA, pointB){

    let middleX = (pointA.x + pointB.x) / 2;
    let StartPoint = "M " + pointA.x + ' ' + pointA.y;

    let CubicPoint1 = "C " + middleX + ' ' + pointA.y;
    let CubicPoint2 = " " + middleX + ' ' + pointB.y;
    let EndPoint = " " + pointB.x + ' ' + pointB.y;

    let d = StartPoint + CubicPoint1 + CubicPoint2 + EndPoint;

    return d;
  }

}