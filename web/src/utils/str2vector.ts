
//Convert string to an integer array
export function str2vector(word: string){
    let vector = []
    let num=''
    for(let i=0; i<word.length; i++){
        if(word.charAt(i)!==','){
            num+=word.charAt(i);
        }else{
            vector[vector.length] = parseInt(num)
            num='';
        }
    }
    vector[vector.length] = parseInt(num);
    return vector;
}