import { Controller, Get, Post } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';

@Controller('time-entries')
export class TimeEntriesController {
    constructor(
        private readonly timeEntriesService: TimeEntriesService,
    ) { }

    @Get()
    async getTimeEntries() {
        return this.timeEntriesService.getTimeEntries(1);
    }

    @Post()
    async createTimeEntry() {
        return this.timeEntriesService.createTimeEntry();
    }
}
