import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";
import { LOG_TEXT_ENUM } from "../enum/LogText.enum";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger : Logger
    constructor(protected readonly model : Model<TDocument>) {}

    async create(document : Omit<TDocument,"_id" | "createdAt">) {
       try {
        const createDocument = new this.model({
            ...document,
            createdAt : new Date(),
            _id : new Types.ObjectId()
        })

        return (await createDocument.save()).toJSON() as unknown as TDocument
       } catch (error) {
            console.log(error)
            throw error
       }
    }

    async findOne(filterQuery : FilterQuery<TDocument>) : Promise<TDocument> {
        const document = await this.model.findOne (filterQuery).lean<TDocument>(true)
        if(!document) {
            this.logger.warn(LOG_TEXT_ENUM.DOC_NOT_FOUND , filterQuery)
            throw new NotFoundException(LOG_TEXT_ENUM.DOC_NOT_FOUND)
        }
        return document
    }
    
    async findAll(filterQuery : FilterQuery<TDocument>) : Promise<TDocument[]> {
        const documents = await this.model.find(filterQuery).lean<TDocument[]>(true)
        return documents
    }


    async update(
        filterQuery : FilterQuery<TDocument>,
        updateQuery : UpdateQuery<TDocument>
    ) : Promise<TDocument> { 
        const document = await this.model.findOneAndUpdate( filterQuery,updateQuery,{
            new : true
        }).lean<TDocument>(true)

        if(!document) {
            this.logger.warn(LOG_TEXT_ENUM.DOC_NOT_FOUND , filterQuery)
            throw new NotFoundException(LOG_TEXT_ENUM.DOC_NOT_FOUND)
        }
        
        return document
    }

    async remove(filterQuery : FilterQuery<TDocument>) : Promise<TDocument> {
        const document = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true)
     
        return document
    }
    
    
} 