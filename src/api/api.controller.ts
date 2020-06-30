import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';
import { Api } from './api.interface';

@Controller('api/timestamp')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getTimestamp(): Api {
    return this.apiService.noParameters();
  }

  @Get(':unix')
  getTimestampWithParam(@Param('unix') unix: string): Api {
    return this.apiService.withParameters(unix);
  }
}
