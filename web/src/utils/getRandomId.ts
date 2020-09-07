const MAX_ID = 10;

//Create a random ID with a-z and A-Z and 0-9 and length === 10
export function getRandomId(){
    let randomId = '0';
    const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    let stringChoosed = '';
    for(let i=0; i<MAX_ID; i++){
        let wordPlace = Math.round(Math.random()*allCharacters.length)
        //Verify if wordPlace is not between 0 and 62
        if(wordPlace>=62){
            wordPlace=61;
        }else if(wordPlace<0){
            wordPlace=0;
        }

        //Put the random character in the string
        stringChoosed += allCharacters.charAt(wordPlace)
    }
    randomId = stringChoosed;

    return randomId;
}