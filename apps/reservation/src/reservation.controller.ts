import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGaurd } from '@app/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { UserDocument } from 'apps/auth/src/user/models/user.schema';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }


  @UseGuards(JwtAuthGaurd)
  @Post()
  create(@Body() createReservationDto: CreateReservationDto,
    @CurrentUser() userDocument: UserDocument
  ) {
    return this.reservationService.create(createReservationDto, userDocument);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
