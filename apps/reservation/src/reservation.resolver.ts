import { Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { ReservationDocument } from "./models/reservation.schema";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { CurrentUser } from "@app/common/decorators/current-user.decorator";
import { GetUserDto } from "apps/auth/src/user/dto/get-user.dto";
import { User as UserDocument } from "apps/auth/src/user/models/user.schema";
import { User } from "./models/user.schema";


@Resolver(() => ReservationDocument)
export class ReservationResolver {
    constructor(private readonly reservationService: ReservationService) { }

    @Mutation(() => ReservationDocument)
    async createReservation(
        @Args("createReservationInput") createReservationInput: CreateReservationDto,
        @CurrentUser() user: UserDocument
    ) {
        return this.reservationService.create(createReservationInput, user)
    }

    @Query(() => [ReservationDocument], { name: "reservations" })
    async findAll() {
        console.log(await this.reservationService.findAll())
        return await this.reservationService.findAll()
    }

    @Query(() => ReservationDocument, { name: "reservation" })
    async findOne(@Args("id", { type: () => String }) id: string) {
        return this.reservationService.findOne(id)
    }

    @Mutation(() => ReservationDocument)
    remove(@Args("id", { type: () => String }) id: string) {
        return this.reservationService.remove(id)
    }


    @ResolveField(() => User)
    user(@Parent() reservation: ReservationDocument): any {
         return { __typename: 'User', _id: reservation.userId };
    }

    
}