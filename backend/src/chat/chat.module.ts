import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { WsService} from './ws.service'

@Module({
  imports:[TypeOrmModule.forFeature([Chat])],
  providers: [ChatGateway, ChatService , { provide:'WS_SERVICE' , useClass:WsService  }],
  exports:[TypeOrmModule]
})
export class ChatModule {}
