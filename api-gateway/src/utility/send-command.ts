import { RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

export const sendCommand = async (
  client: ClientProxy,
  command: Object,
  payload: Object,
  timeoutMs = 10000,
) => {
  return await client
    .send<string>(command, payload)
    .pipe(
      timeout(timeoutMs),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    )
    .toPromise();
};
