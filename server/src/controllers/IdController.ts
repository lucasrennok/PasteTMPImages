import {Request, Response} from 'express';
import db from "../database/connections";

export default class IdController{

    //get the id with the files or return undefined
    async index(request: Request, response: Response){
        const {id} = request.query;

        console.log(id)
        const selectedFiles = db('files')
            .select('*')
            .where('files.id_url', '=', id as string)

        return response.json(selectedFiles);
    }

    //create an id with the files
    async create(request: Request, response: Response){
        const {
            id,
            file
        } = request.body;
    
        const trx = await db.transaction();
        try{
            await trx('id').insert({
                id
            });
            
            await trx('files').insert({
                id_url: id,
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