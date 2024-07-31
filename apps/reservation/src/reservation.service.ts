import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Types } from 'mongoose';
import { AUTH_SERVICE, MESSAGE_PATTERN, PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDocument } from 'apps/auth/src/user/models/user.schema';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentClient: ClientProxy,
  ) {

  }
  async create(createReservationDto: CreateReservationDto, user: UserDocument) {
    try {
      console.log(user)

      await lastValueFrom(this.paymentClient.send(
        MESSAGE_PATTERN.PAYMENT.CREATE_CHARGE,
        {
          ...createReservationDto.charge,
          email: user.email
        },

      ))

 
      return await this.reservationRepository.create({
        ...createReservationDto,
      })
    } catch (error) {
      console.log(error)
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
