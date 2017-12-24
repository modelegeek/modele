export default class ForeignKey {

  constructor (from, to, color){
    this.from = from;
    this.to = to;
    this.color = color;
    this.d = this.calculateD();
  }

  calculateD (){
    let fromElement = this.from.element;
    let toElement = this.to.element;

    // should have the same width
    let widthElement = fromElement.offsetWidth;

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

    rightFromElement = Math.abs(rightFromElement);
    rightToElement = Math.abs(rightToElement);
    leftFromElement = Math.abs(leftFromElement);
    leftToElement = Math.abs(leftToElement);

    let fromRightToLeftRange = rightFromElement - leftToElement;
    let fromLeftToRightRange = leftFromElement - rightToElement;

    let RightToRight = rightFromElement - rightToElement;

    RightToRight = Math.abs(RightToRight);

    let pointA = null;
    let pointB = null;

    if ( Math.abs(fromRightToLeftRange) <= Math.abs(fromLeftToRightRange) ) {
      pointA = { x: rightFromElement, y: FromElementY }
      pointB = { x: leftToElement, y: ToElementY }
    } else {
      pointA = { x: rightToElement, y: ToElementY }
      pointB = { x: leftFromElement, y: FromElementY }
    }

    if ( RightToRight <= widthElement ) {
      pointA = { x: rightFromElement, y: FromElementY }
      pointB = { x: rightToElement, y: ToElementY }

      return this.assignCurvetoFunction(pointA, pointB, widthElement)
    }

    return this.assignCubicFunction(pointA, pointB)
  }

  assignCurvetoFunction (pointA, pointB, widthElement){
    let middleX = pointA.x + (widthElement / 2);
    let StartPoint = "M " + pointA.x + ' ' + pointA.y;

    let CurvetoPoint = "Q " + middleX + ' ' + ((pointA.y + pointB.y) / 2);
    let EndPoint = " " + pointB.x + ' ' + pointB.y;

    let d = StartPoint + CurvetoPoint + EndPoint;

    return d;
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