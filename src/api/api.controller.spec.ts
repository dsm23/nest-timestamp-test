import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';

const date = new Date('2014-11-11');

MockDate.set(date);

describe('Api Controller', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  describe('api controller', () => {
    it('should return today', () => {
      expect(controller.getTimestamp()).toEqual({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    });

    it('should return with date string parameters', () => {
      expect(controller.getTimestampWithParam('2015-12-25')).toEqual({
        unix: 1451001600000,
        utc: 'Fri, 25 Dec 2015 00:00:00 GMT',
      });
    });

    it('should return with unix parameters', () => {
      expect(controller.getTimestampWithParam('1451001600000')).toEqual({
        unix: 1451001600000,
        utc: 'Fri, 25 Dec 2015 00:00:00 GMT',
      });
    });
  });
});
