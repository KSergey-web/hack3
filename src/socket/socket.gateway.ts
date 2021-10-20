import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { AuthDto, CreateSocketDto } from './dto/socket.dto';
import { Socket, Server } from 'socket.io';
import { forwardRef, Inject, Logger, UseFilters } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { TransportService } from 'src/transport/transport.service';
@WebSocketGateway()
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private readonly socketService: SocketService,
    private readonly transportService: TransportService
  ) {
  }

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('SocketGateway');

  @SubscribeMessage('auth')
  auth(
    @MessageBody() createSocketDto: AuthDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.socketService.auth(client, createSocketDto);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
   // this.socketService.clientDisconnect(client);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connectedEvent');
  }

  afterInit(server: Server) {
    this.socketService.setServer(server);
   
    setInterval( async () => {
      let coordinates = await this.transportService.getAllCoordinates();
      coordinates.forEach((coordinate)=>{
        this.server.to(coordinate.transport.company as any).emit('traffic',{
          latitude: coordinate.latitude, 
          longitude: coordinate.longitude,
          transport: coordinate.transport._id
      }) 
    }
    )
  }, 1000);
  }
}
