import api from "../services/api";

const MAX_ID = 10;

export function getRandomId(){
    let randomId = '0';
    // let error = 0; //change it to 1

    const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    // while(error!==0){
        let stringChoosed = '';
        
        for(let i=0; i<MAX_ID; i++){
            stringChoosed += allCharacters.charAt(Math.round(Math.random()*allCharacters.length))
        }

        randomId = stringChoosed;
        //search at database and create
        // api.get('?id=12345').then(response => {
        //     error = response.data.length;
        //     console.log(error, response.data);
        //     if(error===0){
        //         return randomId;
        //     }
        // });
        return randomId;
    // }
}