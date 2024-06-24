export class ChatRoomMessageDto {
    sender_id:string;
    reciver_id:string;
    room_id?:string;
    socket_id?:string;
    msg:string;
}