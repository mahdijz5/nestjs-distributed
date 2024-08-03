import { AbstractDocument } from "@app/common/database";
import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
  
@Schema({ versionKey: false })
@ObjectType()
export class ReservationDocument extends AbstractDocument {
    @Prop()
    @Field()
    startDate: Date

    @Field()
    @Prop()
    endDate: Date

    @Field()
    @Prop()
    userId: string

    @Field(() => User)
    user?: User;

    @Field()
    @Prop()
    placeId: string

    @Field()
    @Prop()
    invoiceId: string
}


export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument) 