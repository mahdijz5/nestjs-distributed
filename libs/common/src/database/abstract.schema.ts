import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes, Types } from "mongoose";

@Schema()
@ObjectType({isAbstract:true})
export abstract class AbstractDocument{
    @Field(() => String)
    @Prop({type : SchemaTypes.ObjectId})
    _id : Types.ObjectId
    
    @Field()
    @Prop()
    createdAt: Date

}