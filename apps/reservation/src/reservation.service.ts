import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Types } from 'mongoose';
import { AUTH_SERVICE, MESSAGE_PATTERN, PAYMENT_SERVICE, PAYMENT_SERVICE_NAME, PaymentServiceClient } from '@app/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { UserDocument } from 'apps/auth/src/user/models/user.schema';

@Injectable()
export class ReservationService implements OnModuleInit {
  private paymentService: PaymentServiceClient

  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE_NAME) private readonly paymentClient: ClientGrpc,
  ) {

  }

  onModuleInit() {
    this.paymentService = this.paymentClient.getService<PaymentServiceClient>(PAYMENT_SERVICE_NAME)
  }

  async create(createReservationDto: CreateReservationDto, user: UserDocument) {
    try {
      this.paymentService.createCharge(
        {
          ...createReservationDto.charge,
          email: user.email
        },

      ).subscribe(async (response) => {
        console.log("response")
        console.log(response)
        const reservation = await this.reservationRepository.create({
          ...createReservationDto,
        })
      })
      return {}
    } catch (error) {
      return {}
    }


  }

  async findAll() {
    return `This action returns all reservation`;
  }

  async findOne(id: string) {
    return await this.reservationRepository.findOne({ _id: new Types.ObjectId(id) })
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.update({ _id: new Types.ObjectId(id) }, { ...updateReservationDto })
  }

  async remove(id: string) {
    return await this.reservationRepository.remove({ _id: new Types.ObjectId(id) })
  }
}
