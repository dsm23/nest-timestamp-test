import { Injectable } from '@nestjs/common';
import { Api } from './api.interface';

@Injectable()
export class ApiService {
  noParameters(): Api {
    const today = new Date();

    return {
      unix: today.getTime(),
      utc: today.toUTCString(),
    };
  }
  withParameters(unix: string): Api {
    let date;
    if (typeof unix === 'string' && !Number.isNaN(Number(unix))) {
      date = new Date(Number(unix));
    } else {
      const dateString = unix as string;
      date = new Date(Date.parse(dateString));
    }

    return {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  }
}
