import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(
    date: string,
    time: string,
    place: string,
    user: User,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      date,
      time,
      place,
      user,
    });
    return this.reservationRepository.save(reservation);
  }

  async getUserReservations(user: User): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { user } });
  }

  async cancelReservation(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
