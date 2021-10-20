import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as fs from 'fs';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    let details: any =
      exception.getResponse != undefined ? exception.getResponse() : exception;
    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message || null
          : 'Internal server error',
      details: details?.message,
      bodyreq: request.body,
      paramreq: request.params,
      queryreq: request.query,
      cookiesreq: request.cookies,
    };
    const reqInfo = {
      timestamp: new Date(),
      path: request.url,
      method: request.method,
      bodyreq: request.body,
      paramreq: request.params,
      queryreq: request.query,
      cookiesreq: request.cookies,
    };
    if (process.env.LOG) this.logExeption(status, reqInfo, exception, errorResponse)
    response.status(status).json(errorResponse);
  }

  private logExeption(status: number, reqInfo: any, exception: any, errorResponse: any): undefined{
    fs.writeFile(
      'loggs/LogFile.json',
      ' //reqinfo \n' + JSON.stringify(reqInfo) + ';\n',
      { flag: 'a+' },
      err => {},
    );
    if (status == 500) {
      fs.writeFile(
        'loggs/LogFile.json',
        ' //exeption info \n' + JSON.stringify(exception) + ';\n',
        { flag: 'a+' },
        err => {},
      );
    } else {
      fs.writeFile(
        'loggs/LogFile.json',
        ' //error info \n' + JSON.stringify(errorResponse) + ';\n',
        { flag: 'a+' },
        err => {},
      );
    }
    return;
  }
}
