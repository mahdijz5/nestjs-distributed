import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes, Types } from "mongoose";

@Schema()
export abstract class AbstractDocument{
    @Prop({type : SchemaTypes.ObjectId})
    _id : Types.ObjectId

    @Prop()
    createdAt: Date

}