import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import * as moment from 'moment';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async generateMonthlyActivities() {
    const now = moment();
    const year = now.year();
    const month = now.month() + 1;
    const daysInMonth = now.daysInMonth();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format(
        'YYYY-MM-DD',
      );
      const existingActivity = await this.activityRepository.findOne({
        where: { date },
      });

      if (!existingActivity) {
        const activity = this.activityRepository.create({
          date,
          time: '18:00',
          place: 'Default Place',
        });
        await this.activityRepository.save(activity);
      }
    }
  }

  async getAllActivities(): Promise<Activity[]> {
    return this.activityRepository.find();
  }
}
