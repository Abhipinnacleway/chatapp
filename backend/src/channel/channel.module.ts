import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Member } from './entities/member.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Channel , Member])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports:[TypeOrmModule],
})
export class ChannelModule {}
