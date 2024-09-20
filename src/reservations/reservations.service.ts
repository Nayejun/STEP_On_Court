import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.reservationRepository.find({
      where: { user },
      relations: ['user'],
    });
  }

  async getReservationsByDate(date: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { date },
      relations: ['user'],
    });
  }

  async cancelReservation(id: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    await this.reservationRepository.delete(id);
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find({ relations: ['user'] });
  }

  async updateReservation(
    id: number,
    date: string,
    time: string,
    place: string,
    user: User,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id, user },
      relations: ['user'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    reservation.date = date;
    reservation.time = time;
    reservation.place = place;

    return this.reservationRepository.save(reservation);
  }
}
