import { AbstractDocument } from "@app/common/database";
import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ versionKey: false })
@ObjectType()
@Directive('@key(fields: "_id")')
 export class User {

    @Field(() => ID)
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId


    @Field()
 
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    email : string
    
    @Field()
    @Prop()
    password : string
}
 

export const UserSchema = SchemaFactory.createForClass(User)  