export function clamp(a, b, x){
    return x < a ? a : (x > b ? b : x);
}

export function angleAtoB(body0, body1){
    return Math.atan2(body1.y-body0.y,body1.x-body0.x);
}

//Interpolation functions
export function lErp(a, b, t){
    return t < 0 ? 0 : (t > 1 ? 1 : a + (b-a)*t);
}

export function easeIn(a, b, t){
    return t < 0 ? 0 : (t > 1 ? 1 : (a-b)*(1-t)*(1-t) + b);
}

export function easeOut(a, b, t){
    return t < 0 ? 0 : (t > 1 ? 1 : a + (b-a)*t*t);
}

//Random functions
export function randomUniform(a, b){
    return a + (b-a)*Math.random();
}