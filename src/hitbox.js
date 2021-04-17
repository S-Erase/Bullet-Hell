export default class Circle{
    constructor(x,y,rad){
        this.x = x;
        this.y = y;
        this.radius = rad;
    }
}

export class Line{
    constructor(x0,y0,dx,dy,wid){
        this.x0 = x0;
        this.y0 = y0;
        this.dx = dx;
        this.dy = dy;
        this.wid = wid;
    }
}

export function doCirclesIntersect(cir0,cir1){
    let dx = cir0.x - cir1.x;
    let dy = cir0.y - cir1.y;
    let sum = cir0.radius + cir1.radius;
    return (dx*dx + dy*dy) <= sum*sum;
}

export function doesCircleIntersectLine(cir,lin){
    let len = Math.sqrt(dx*dx+dy*dy);

    let dotToLine = (cir.x-lin.x0)*dy - dx*(cir.y-lin.y0);
    let dotToBisector = (cir.x-(lin.x0+dx/2))*dx + dy*(cir.y-(lin.y0+dy/2));

    let distToLine = Math.max(Math.abs(dotToLine)/len - lin.wid,0);
    let distToBisector = Math.max(Math.abs(dotToBisector)/len - len/2,0);
    return distToLine**2+distToBisector**2 == 0;
}