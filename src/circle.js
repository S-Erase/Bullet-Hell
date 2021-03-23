export default class Circle{
    constructor(x,y,rad){
        this.x = x;
        this.y = y;
        this.radius = rad;
    }
}

export function doCirclesIntersect(cir0,cir1){
    let dx = cir0.x - cir1.x;
    let dy = cir0.y - cir1.y;
    let sum = cir0.radius + cir1.radius;
    return (dx*dx + dy*dy) <= sum*sum;
}