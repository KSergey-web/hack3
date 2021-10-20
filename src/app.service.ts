import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable, take } from 'rxjs';
//import {AES} from 'crypto-js'



// function decrypt(message = '', key = ''){
//   var bytes  = CryptoJS.AES.decrypt(message, 'secret key 123');
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'hello';
  }


  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Imt1bGFldiIsImlhdCI6MTYzMTM4MTk1MywiZXhwIjoxNjMxNDY4MzUzfQ.1xhvvEuRHDzh4i15ECxYPOt1dj2qTekXRsRaCZ6O-LI';

  async findAll(): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .get<AxiosResponse<any>>('http://localhost:4000/v1/api/user', {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        })
        .pipe(
          take(1),
          map((res) => res.data),
        ),
    );
  }
}
