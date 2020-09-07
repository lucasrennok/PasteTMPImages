import {Request, Response} from 'express';
import db from "../database/connections";

//Controller to create files with an ID and send data of an ID
export default class IdController{

    //Get all the files with the respective ID 
    async index(request: Request, response: Response){
        const {id} = request.query;

        console.log('GET:',id)
        const selectedFiles = await db('files')
            .select('files.filename', 'files.type', 'files.file')
            .where('files.id_url', '=', id as string);

        //If nothing found, return []
        if(selectedFiles.length==0){
            return response.status(201).json(
                []
            )
        }
        return response.status(201).json(selectedFiles);
    }

    //Create files
    async create(request: Request, response: Response){
        const {
            id,
            filename,
            type,
            file
        } = request.body;
    
        //If the ID is wrong, return status 400
        if(id.length!==10){
            console.log('Id is wrong.')
            return response.status(400).json({
                error: "ID is wrong."
            })
        }

        console.log('ID POST:',id);

        let trx = await db.transaction();
        
        try{
            //Insert into 'files' table
            await trx('files').insert({
                id_url: id,
                filename,
                type,
                file
            });

            await trx.commit();
    
            return response.status(201).send();
        }catch(err){
            await trx.rollback();
    
            return response.status(400).json({
                error: "Unexpected error while creating the id url."
            })
        }
    }
}