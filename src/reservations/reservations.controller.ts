import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { User } from '../users/user.entity';
import { ReqUser } from 'src/auth/req-user.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('create')
  async createReservation(
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('place') place: string,
    @ReqUser() user: User,
  ) {
    return this.reservationsService.createReservation(date, time, place, user);
  }

  @Get('my')
  async getUserReservations(@ReqUser() user: User) {
    return this.reservationsService.getUserReservations(user);
  }

  @Delete('cancel/:id')
  async cancelReservation(@Param('id') id: number) {
    return this.reservationsService.cancelReservation(id);
  }
}
