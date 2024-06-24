import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Socket } from 'socket.io'
import { Req } from '@nestjs/common';
import {  NewJoinedUserDto } from './dto/new-join-room.dto';
import { RoomUser } from './interfaces/RoomUser';

@WebSocketGateway( {cors:true} )
export class ChatGateway {
  chatRoom = 'room';
  allUsers:Map<string , string> = new Map();
  allChats:Map<string , {sender:string , receiver:string , msg:string , date:string }[] > = new Map();
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @SubscribeMessage('Join')
  async joinRoom(@ConnectedSocket() socket:Socket , @MessageBody() data:NewJoinedUserDto ){
    if(!this.allUsers.has(data.username)){
      this.allUsers.set(data.username , data.id);
      let users:{id:string , name:string}[] = []
      this.allUsers.forEach((key , value) => {
        users.push({id:key , name:value });
      })
      socket.join(this.chatRoom);
      socket.emit('Join_Callback' , { msg:`Welcome ${data.username}` , users:users  } )
    
      socket.to(this.chatRoom).emit('NewJoin' , { msg:`${data.username} has joined` , newJoin:data.username , users:users } )
    }else{
      socket.emit('Join_Callback' , {msg:'You already Joined this room !' })
    }
  }
  @SubscribeMessage('getInfo')
  async sendData(@ConnectedSocket() socket:Socket ){
    let users:{id:string , name:string}[] = []
    this.allUsers.forEach((key , value) => {
      // users.push({id:item })
      users.push({id:key , name:value });
    })
    socket.emit('data' , { users:users })
  
  }
  @SubscribeMessage('getAllChats')
  async sendChatsData(@ConnectedSocket() socket:Socket , @MessageBody() data:{name:string}  ){
   
    socket.emit('getAllChats_callback' , { chats:this.allChats.get(data.name)  })
  
  }
  @SubscribeMessage('conversation')
  async chatMessage(@ConnectedSocket() Socket:Socket , @MessageBody() data:CreateChatDto ){
    console.log(data)
    let chats: {sender:string , receiver:string , msg:string , date:string }[] = this.allChats.get(data.receiver) || []  ;
    chats.push({sender:data.sender , msg:data.msg , receiver:data.receiver , date:data.date })
    this.allChats.set(data.receiver , chats );
    if(data.receiver === this.chatRoom){
        Socket.to(this.chatRoom).except(data.sender).emit('conversation_callback' , { chats:this.allChats.get(data.receiver) }  )
    }else{
      // Socket.join(this.allUsers.get(data.receiver)).emit('coversation_callback' , {  }) 
      Socket.to(this.allUsers.get(data.receiver)).emit('conversation_callback' , {chats:this.allChats.get(data.receiver)} )
      // Socket.to(data.)
    }
    console.log(this.allChats)
  }
}


/*
  Join the sender and user to a room for private chat at line 59
*/ 