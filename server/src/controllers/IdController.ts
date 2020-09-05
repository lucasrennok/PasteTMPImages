import {Request, Response} from 'express';
import db from "../database/connections";

export default class IdController{

    //get the id with the files or return undefined
    async index(request: Request, response: Response){
        const {template} = request.query;

        return response.json({"a": "b"});
    }

    //create an id with the files
    async create(request: Request, response: Response){
        const {
            template,
            top,
            right,
            bottom,
            left
        } = request.body;
    
        const trx = await db.transaction();
        try{
            await trx('template_margins').insert({
                template,
                top,
                right,
                bottom,
                left
            });
            
            await trx.commit();
    
            return response.status(201).send();
        }catch(err){
            await trx.rollback();
    
            return response.status(400).json({
                error: "Unexpected error while creating the template margin."
            })
        }
    }
}