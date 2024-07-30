import { AbstractDocument } from "@app/common/database";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    
    @Field()
    @Prop()
    placeId: string
    
    @Field()
    @Prop()
    invoiceId: string
}


export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument) 