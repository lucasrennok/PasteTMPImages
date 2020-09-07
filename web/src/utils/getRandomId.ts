const MAX_ID = 10;

export function getRandomId(){
    let randomId = '0';
    const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    let stringChoosed = '';
    for(let i=0; i<MAX_ID; i++){
        stringChoosed += allCharacters.charAt(Math.round(Math.random()*allCharacters.length))
    }
    randomId = stringChoosed;

    return randomId;
}