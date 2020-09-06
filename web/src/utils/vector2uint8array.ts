export function vector2uint8array(vector: Number[]){
    let arrayuint = new Uint8Array(vector.length);
    for (let i = 0; i < vector.length; i++){
        //@ts-ignore
        arrayuint[i] = vector[i];
    }
    return arrayuint;
}