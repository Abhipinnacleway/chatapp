import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepo:Repository<Chat> 
  ){}
  async create(createChatDto: CreateChatDto) {
    // const {  sender_id , targer_id , content , isChannel  } = createChatDto
    // try{
    //   let res = await  this.chatRepo.insert({send_from:sender_id , send_to:targer_id , content:content , toChannel:isChannel})
    //   return res
    // }
    // catch(error){
    //   console.log(error)
    //   return null ;
    // }
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
