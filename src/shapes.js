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
	ctx.moveTo(x,y+r);
	ctx.bezierCurveTo(x-r*1.76,y-r*0.07,x-r*0.54,y-r*1.40,x,y-r*0.47);
	ctx.moveTo(x,y+r);
	ctx.bezierCurveTo(x+r*1.76,y-r*0.07,x+r*0.54,y-r*1.40,x,y-r*0.47);
}