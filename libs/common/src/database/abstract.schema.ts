import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes, Types } from "mongoose";

@Schema()
@ObjectType({ isAbstract: true })
export abstract class AbstractDocument {

    @Field(() => ID)
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId


    @Field()
    @Directive('@shareable')
    @Prop()
    createdAt: Date

}