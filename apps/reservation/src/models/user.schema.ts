import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AbstractDocument } from '@app/common';
import { SchemaTypes, Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@ObjectType( )
@Directive('@key(fields: "_id")')
export class User {
    @Field(() => ID)
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId

 
    // @Field()
    // @Prop()
    // createdAt: Date


}
