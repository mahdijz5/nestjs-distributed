import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { Types } from 'mongoose';
import { AUTH_SERVICE } from '@app/common';
import { PaymentService } from 'apps/payment/src/payment.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PaymentService) private readonly paymentClient: ClientProxy,
  ) {

  }
  async create(createReservationDto: CreateReservationDto) {
    return await this.reservationRepository.create({
      ...createReservationDto
    })
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
