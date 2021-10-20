import { forwardRef, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TransportService } from 'src/transport/transport.service';
import { TransportModule } from 'src/transport/transport.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TransportModule, AuthModule],
  providers: [SocketGateway, SocketService],
  exports: [SocketService, SocketGateway],
})
export class SocketModule {}
