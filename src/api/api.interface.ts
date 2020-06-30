export interface Api {
  unix: ReturnType<Date['getTime']>;
  utc: ReturnType<Date['toUTCString']>;
}
