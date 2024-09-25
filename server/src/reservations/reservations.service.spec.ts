import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repository = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReservation', () => {
    it('should create a reservation', async () => {
      const user = new User();
      const reservation = new Reservation();
      jest.spyOn(repository, 'create').mockReturnValue(reservation);
      jest.spyOn(repository, 'save').mockResolvedValue(reservation);

      expect(
        await service.createReservation('2023-10-10', '10:00', 'Court 1', user),
      ).toBe(reservation);
    });
  });

  describe('getUserReservations', () => {
    it('should return user reservations', async () => {
      const user = new User();
      const reservations = [new Reservation()];
      jest.spyOn(repository, 'find').mockResolvedValue(reservations);

      expect(await service.getUserReservations(user)).toBe(reservations);
    });
  });

  describe('getReservationsByDate', () => {
    it('should return reservations by date', async () => {
      const reservations = [new Reservation()];
      jest.spyOn(repository, 'find').mockResolvedValue(reservations);

      expect(await service.getReservationsByDate('2023-10-10')).toBe(
        reservations,
      );
    });
  });

  describe('cancelReservation', () => {
    it('should throw NotFoundException if reservation not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.cancelReservation(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete the reservation', async () => {
      const reservation = new Reservation();
      jest.spyOn(repository, 'findOne').mockResolvedValue(reservation);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.cancelReservation(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('getAllReservations', () => {
    it('should return all reservations', async () => {
      const reservations = [new Reservation()];
      jest.spyOn(repository, 'find').mockResolvedValue(reservations);

      expect(await service.getAllReservations()).toBe(reservations);
    });
  });

  describe('updateReservation', () => {
    it('should throw NotFoundException if reservation not found', async () => {
      const user = new User();
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateReservation(1, '2023-10-10', '10:00', 'Court 1', user),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update and return the reservation', async () => {
      const user = new User();
      const reservation = new Reservation();
      jest.spyOn(repository, 'findOne').mockResolvedValue(reservation);
      jest.spyOn(repository, 'save').mockResolvedValue(reservation);

      expect(
        await service.updateReservation(
          1,
          '2023-10-10',
          '10:00',
          'Court 1',
          user,
        ),
      ).toBe(reservation);
    });
  });
});
