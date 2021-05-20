import { ctx } from "./screen.js";

export function star(x,y,r){
	let ang = Math.PI/5;
	//let scale = 2/(3+Math.sqrt(5));
	let scale = 0.5;
	ctx.moveTo(x,y-r);
	ctx.lineTo(x+r*scale*Math.sin(ang),	y-r*scale*Math.cos(ang));
	ctx.lineTo(x+r*Math.sin(2*ang),	y-r*Math.cos(2*ang));
	ctx.lineTo(x+r*scale*Math.sin(3*ang),	y-r*scale*Math.cos(3*ang));
	ctx.lineTo(x+r*Math.sin(4*ang),	y-r*Math.cos(4*ang));
	ctx.lineTo(x,y+r*scale);
	ctx.lineTo(x-r*Math.sin(4*ang),	y-r*Math.cos(4*ang));
	ctx.lineTo(x-r*scale*Math.sin(3*ang),	y-r*scale*Math.cos(3*ang));
	ctx.lineTo(x-r*Math.sin(2*ang),	y-r*Math.cos(2*ang));
	ctx.lineTo(x-r*scale*Math.sin(ang),	y-r*scale*Math.cos(ang));
	ctx.lineTo(x,y-r);
}
export function heart(x,y,r){
	ctx.moveTo(x,y-r*0.47);
	ctx.bezierCurveTo(x-r*0.54,y-r*1.40, x-r*1.76,y-r*0.07, x,y+r);
	ctx.bezierCurveTo(x+r*1.76,y-r*0.07, x+r*0.54,y-r*1.40, x,y-r*0.47);
}

function truncatedBezierCurveTo(x0,y0, x1,y1, x2,y2, x3,y3, t0,t1)
{
	const xBez = (t) => x0*(1-t)**3 + 3*x1*t*(1-t)**2 + 3*x2*t**2*(1-t) + x3*t**3;
	const yBez = (t) => y0*(1-t)**3 + 3*y1*t*(1-t)**2 + 3*y2*t**2*(1-t) + y3*t**3;

	const newx0 = xBez(t0);
	const newy0 = yBez(t0);
	
	const newx3 = xBez(t1);
	const newy3 = yBez(t1);

	const xBezD = (t) => 3*(x1-x0)*(1-t)**2 + 6*(x2-x0)*t*(1-t) + 3*(x3-x2)*t**2;
	const yBezD = (t) => 3*(y1-y0)*(1-t)**2 + 6*(y2-y0)*t*(1-t) + 3*(y3-y2)*t**2;

	const newx1 = newx0 + (t1-t0)*xBezD(t0)/3;
	const newy1 = newy0 + (t1-t0)*yBezD(t0)/3;

	const newx2 = newx3 - (t1-t0)*xBezD(t1)/3;
	const newy2 = newy3 - (t1-t0)*yBezD(t1)/3;

	ctx.moveTo(newx0,newy0);
	ctx.bezierCurveTo(newx1,newy1, newx2,newy2, newx3,newy3);
}

//Heart piece shapes

export function heartOneThird(x,y,r){
	ctx.moveTo(x,y-r*0.47);
	ctx.bezierCurveTo(x-r*0.49,y-r*1.31, x-r*1.44,y-r*0.16, x-r*0.44,y+r*0.67);
	ctx.lineTo(x,y);
	ctx.lineTo(x,y-r*0.47);
}
export function heartOneHalf(x,y,r){
	ctx.moveTo(x,y-r*0.47);
	ctx.bezierCurveTo(x-r*0.54,y-r*1.40, x-r*1.76,y-r*0.07, x,y+r);
	ctx.lineTo(x,y-r*0.47);
}
export function heartTwoThirds(x,y,r){
	ctx.moveTo(x,y-r*0.47);
	ctx.bezierCurveTo(x-r*0.54,y-r*1.40, x-r*1.76,y-r*0.07, x,y+r);
	ctx.bezierCurveTo(x+r*0.17,y+r*0.89, x+r*0.29,y+r*0.80, x+r*0.44,y+r*0.67);
	ctx.lineTo(x,y);
	ctx.lineTo(x,y-r*0.47);
}