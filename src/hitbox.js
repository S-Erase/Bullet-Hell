export default class Circle{
    constructor(x,y,rad){
        this.x = x;
        this.y = y;
        this.radius = rad;
    }
}

export class Line{
    constructor(x0,y0,dx,dy,rad){
        this.x0 = x0;
        this.y0 = y0;
        this.dx = dx;
        this.dy = dy;
        this.radius = rad;
    }
}

export function doCirclesIntersect(cir0,cir1){
    const dx = cir0.x - cir1.x;
    const dy = cir0.y - cir1.y;
    const sum = cir0.radius + cir1.radius;
    return (dx*dx + dy*dy) <= sum*sum;
}

export function doesCircleIntersectLine(cir,lin){
    /*
    let len = Math.sqrt(lin.dx*lin.dx+lin.dy*lin.dy);

    let dotToLine = (cir.x-lin.x0)*lin.dy - lin.dx*(cir.y-lin.y0);
    let dotToBisector = (cir.x-(lin.x0+dx/2))*dx + dy*(cir.y-(lin.y0+dy/2));

    let distToLine = Math.max(Math.abs(dotToLine)/len - lin.wid,0);
    let distToBisector = Math.max(Math.abs(dotToBisector)/len - len/2,0);
    return distToLine**2+distToBisector**2 == 0;
    */

    const len2 = lin.dx*lin.dx+lin.dy*lin.dy;
    const t = ((cir.x-lin.x0)*lin.dx + (cir.y-lin.y0)*lin.dy)/len2;
    const sum = cir.radius + lin.radius;
    const dist0 = (cir.x-lin.x0)*(cir.x-lin.x0) + (cir.y-lin.y0)*(cir.y-lin.y0);

    if(t < 0)
    return dist0 < sum*sum;
    if(t > 1)
    return (cir.x-(lin.x0+lin.dx))**2 + (lin.y0+lin.dy)**2 < sum*sum;

    const dot = ((cir.x-lin.x0)*lin.dx + (cir.y-lin.y0)*lin.dy)**2/len2;

    return dist0 - dot < sum*sum;
}
export function doesCircleIntersectRay(cir,lin){
    const len2 = lin.dx*lin.dx+lin.dy*lin.dy;
    const t = ((cir.x-lin.x0)*lin.dx + (cir.y-lin.y0)*lin.dy)/len2;
    const sum = cir.radius + lin.radius;
    const dist0 = (cir.x-lin.x0)*(cir.x-lin.x0) + (cir.y-lin.y0)*(cir.y-lin.y0);

    if(t < 0)
    return dist0 < sum*sum;

    const dot = ((cir.x-lin.x0)*lin.dx + (cir.y-lin.y0)*lin.dy)**2/len2;

    return dist0 - dot < sum*sum;
}