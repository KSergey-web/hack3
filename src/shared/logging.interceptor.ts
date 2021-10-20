import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const reqInfo = {
      timestamp: new Date(),
      path: request.url,
      method: request.method,
      bodyreq: request.body,
      paramreq: request.params,
      queryreq: request.query,
      cookiesreq: request.cookies,
    };
    return next.handle().pipe(
      tap(value => {
        if (process.env.LOG) this.logReqRes(value,reqInfo)
      }),
    );
  }

  private logReqRes(value: any, reqInfo: any): undefined {
    if (reqInfo.path != '/v1/api/user') {
      fs.writeFile(
        'loggs/LogFile.json',
        ' //req info \n' + JSON.stringify(reqInfo) + ';\n',
        { flag: 'a+' },
        err => { },
      );
      fs.writeFile(
        'loggs/logFile.json',
        ' //res info \n' + JSON.stringify(value) + ';\n',
        { flag: 'a+' },
        err => { },
      );
    }
    return;
  }
}
