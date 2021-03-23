export function clamp(a, b, x){
    return x < a ? a : (x > b ? b : x);
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