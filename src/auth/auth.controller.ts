import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UnprocessableEntityException,
  UseInterceptors,
  UploadedFile,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.gaurd';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Query() userDTO: LoginDTO) {
    console.log(userDTO)
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      login: user.login,
    };
    const token = await this.authService.login(payload);
    return { user, token };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async register(
    @Query() userDTO: RegisterDTO,
  ) {
    const user:any = await this.userService.create(userDTO);
    const payload = {
      login: user.login,
    };
    const token = await this.authService.login(payload);
    return { user, token };
  }
}
