import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReservationDocument } from "./models/reservation.schema";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { CurrentUser } from "@app/common/decorators/current-user.decorator";
import { GetUserDto } from "apps/auth/src/user/dto/get-user.dto";
import { UserDocument } from "apps/auth/src/user/models/user.schema";

@Resolver(()=> ReservationDocument)
export class ReservationResolver {
    constructor(private readonly reservationService : ReservationService){}

    @Mutation(() => ReservationDocument)
    async createReservation(
        @Args("createReservationInput") createReservationInput : CreateReservationDto,
        @CurrentUser() user : UserDocument
    ) {
        return this.reservationService.create(createReservationInput,user)
    }

    @Query(() => [ReservationDocument],{ name : "reservations"})
    async findAll() {
        return this.reservationService.findAll()
    }
}
