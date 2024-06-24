import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { ChannelModule } from './channel/channel.module';
import { Member } from './channel/entities/member.entity';
import { Channel } from './channel/entities/channel.entity';
@Module({
  
  controllers: [AppController , UserController , AuthController  ],
  providers: [AppService , UserService, AuthService],
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:"db.sqlite",
    entities:[User , Chat , Member , Channel ],
    synchronize:true
  }), AuthModule, UserModule, ChatModule, ChannelModule],
})
export class AppModule  {

}
