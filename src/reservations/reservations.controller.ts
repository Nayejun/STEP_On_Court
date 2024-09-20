import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReservationsService } from './reservations.service';
import { User } from '../users/user.entity';
import { ReqUser } from '../auth/req-user.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createReservation(
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('place') place: string,
    @ReqUser() user: User,
  ) {
    try {
      const reservation = await this.reservationsService.createReservation(
        date,
        time,
        place,
        user,
      );
      return { message: 'Reservation created successfully', reservation };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async getUserReservations(@ReqUser() user: User) {
    try {
      const reservations =
        await this.reservationsService.getUserReservations(user);
      return reservations;
    } catch {
      throw new HttpException(
        'Failed to get reservations',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('date/:date')
  async getReservationsByDate(@Param('date') date: string) {
    try {
      const reservations =
        await this.reservationsService.getReservationsByDate(date);
      return reservations;
    } catch {
      throw new HttpException(
        'Failed to get reservations for the date',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('cancel/:id')
  async cancelReservation(@Param('id') id: number) {
    try {
      await this.reservationsService.cancelReservation(id);
      return { message: 'Reservation canceled successfully' };
    } catch {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllReservations() {
    try {
      const reservations = await this.reservationsService.getAllReservations();
      return reservations;
    } catch {
      throw new HttpException(
        'Failed to get all reservations',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/cancel/:id')
  async adminCancelReservation(@Param('id') id: number) {
    try {
      await this.reservationsService.cancelReservation(id);
      return { message: 'Reservation canceled successfully by admin' };
    } catch {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async updateReservation(
    @Param('id') id: number,
    @Body('date') date: string,
    @Body('time') time: string,
    @Body('place') place: string,
    @ReqUser() user: User,
  ) {
    try {
      const reservation = await this.reservationsService.updateReservation(
        id,
        date,
        time,
        place,
        user,
      );
      return { message: 'Reservation updated successfully', reservation };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
