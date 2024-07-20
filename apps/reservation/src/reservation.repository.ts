import { AbstractRepository } from "@app/common/database";
import { ReservationDocument } from "./models/reservation.schema";
import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class ReservationRepository extends AbstractRepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationRepository.name)

    constructor(@InjectModel(ReservationDocument.name) private readonly reservationRepository: Model<ReservationDocument>) {
        super(reservationRepository)
    }
}