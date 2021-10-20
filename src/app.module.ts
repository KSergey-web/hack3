import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './configure.root';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TransportModule } from './transport/transport.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    configModule,
    SharedModule,
    HttpModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/hackathon'),
    CompanyModule,
    TransportModule,
    AuthModule,
    UserModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
