import { RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

export const sendCommand = async (
  client: ClientProxy,
  cmd: Object,
  req: any,
  timeoutMs = 10000,
) => {
  const data = {
    headers: !Object.keys(req.headers).length ? null : req.headers,
    params: !Object.keys(req.query).length ? null : req.query,
    body: !Object.keys(req.body).length ? null : req.body
  }
  return await client
    .send<any>({ cmd }, data)
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
