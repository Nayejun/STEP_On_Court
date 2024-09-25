import { Controller, Post, Get } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('generate')
  async generateMonthlyActivities() {
    await this.activityService.generateMonthlyActivities();
    return { message: 'Monthly activities generated successfully' };
  }

  @Get()
  async getAllActivities() {
    return this.activityService.getAllActivities();
  }
}
