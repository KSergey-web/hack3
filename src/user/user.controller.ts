import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { User } from 'src/utilities/user.decorator';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';
@ApiTags('auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  currentUser(@User() { _id }: UserDocument) {
    return this.userService.checkUserById(_id);
  }
}
