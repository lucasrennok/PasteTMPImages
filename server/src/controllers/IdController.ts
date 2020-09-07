import {Request, Response} from 'express';
import db from "../database/connections";
import { json } from 'body-parser';

export default class IdController{

    //get the id with the files or return undefined
    async index(request: Request, response: Response){
        const {id} = request.query;

        console.log('GET:',id)
        const selectedFiles = await db('files')
            .select('files.filename', 'files.type', 'files.file')
            .where('files.id_url', '=', id as string)

        if(selectedFiles.length==0){
            return response.status(201).json(
                []
            )
        }
        return response.status(201).json(selectedFiles);
    }

    //create an id with the files
    async create(request: Request, response: Response){
        const {
            id,
            filename,
            type,
            file
        } = request.body;
    
        if(id.length!==10){
            console.log('Id is wrong.')
            return response.status(400).json({
                error: "ID is wrong."
            })
        }

        console.log('id post:',id);

        let trx = await db.transaction();
        
        try{
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