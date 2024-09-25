import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  describe('ActivityService', () => {
    let service: ActivityService;
    let repository: Repository<Activity>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ActivityService,
          {
            provide: getRepositoryToken(Activity),
            useClass: Repository,
          },
        ],
      }).compile();

      service = module.get<ActivityService>(ActivityService);
      repository = module.get<Repository<Activity>>(
        getRepositoryToken(Activity),
      );
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('generateMonthlyActivities', () => {
      it('should generate activities for the month', async () => {
        const saveSpy = jest
          .spyOn(repository, 'save')
          .mockResolvedValue({} as any);
        const findOneSpy = jest
          .spyOn(repository, 'findOne')
          .mockResolvedValue(null);

        await service.generateMonthlyActivities();

        expect(findOneSpy).toHaveBeenCalled();
        expect(saveSpy).toHaveBeenCalled();
      });

      it('should not create duplicate activities', async () => {
        const saveSpy = jest
          .spyOn(repository, 'save')
          .mockResolvedValue({} as any);
        const findOneSpy = jest
          .spyOn(repository, 'findOne')
          .mockResolvedValue({} as any);

        await service.generateMonthlyActivities();

        expect(findOneSpy).toHaveBeenCalled();
        expect(saveSpy).not.toHaveBeenCalled();
      });
    });

    describe('getAllActivities', () => {
      it('should return all activities', async () => {
        const activities = [
          { date: '2023-10-01', time: '19:00', place: '사당종합체육관' },
        ];
        jest.spyOn(repository, 'find').mockResolvedValue(activities as any);

        const result = await service.getAllActivities();
        expect(result).toEqual(activities);
      });
    });
  });
});
