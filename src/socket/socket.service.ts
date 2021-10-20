import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

import { AuthDto, CreateSocketDto } from './dto/socket.dto';

@Injectable()
export class SocketService {
  constructor(
    private readonly authService: AuthService,
  ) {}

  server:Server;

  setServer(server: Server) {
    this.server = server;
  }

  async auth(client: Socket, auth: AuthDto) {
    const token = auth.token;
    try {
      const user = await this.authService.verifyUser(token);
      client.join(user.company.toString());
    } catch (err) {
      client.emit('errorAuth', { message: token });
    }
    return;
  }
}
