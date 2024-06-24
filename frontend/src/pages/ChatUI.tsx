import React, { useEffect, useState } from 'react'
import '../styles/chat.css'
import { initSocket } from '../config'
import ChatSideBar from '../components/ChatSideBar'
import { Route, useNavigate } from 'react-router'
import ChatBox from '../components/ChatBox'
import { idText } from 'typescript'
import { toast } from 'react-toastify'
export type user = {
    id:string,
    email:string,
}


interface IChatUi {
    user: user
}
type IMemeber = {
    id:string;
    room:string;
    user_id:string;
}
interface IChannel {
    roomid:string;
    memebers:IMemeber[];
}
export interface IChannelsUsers {
    channelname:string;
    members:IMemeber[];
}
export interface IConversation {
    from:string,
    msg:string,
}
const ChatUI:React.FC<IChatUi> = ({ user }) => {
    const navigate = useNavigate();
    const [channel , setChannel] = useState<string>('room');
    const [channelsUsers , setChannelsUsers ] = useState<{id:string , name:string}[]>([])
    const socket = initSocket()
    const handleJoinRoom = () => {
        if(!user) return;
        socket.emit('Join' , { username:user.email , id:socket.id  })
    }
  
    const displayMessage = (msg:string) =>{
        toast.info(msg);
    }
    useEffect(() => {
        socket.on('Join_Callback' , (data) => {
            let users:{id:string , name:string}[] =  data?.users;
            setChannelsUsers(users)
            displayMessage(data?.msg);
        })
        socket.on('NewJoin' , (data) => {
            displayMessage(data?.msg);
            setChannel('room')
            let users:{id:string , name:string}[] =  data?.users;
            setChannelsUsers(users)
        })
        socket.on('data' , async (data:any) => {
            let users:{id:string , name:string}[] =  data?.users;
            setChannelsUsers(users)
        })
        
    },[socket])

    useEffect(() => {
        socket.emit('getInfo')
    } ,[])
    
  
    // console.log(user)
  return (
        <div className='bg-black/20  h-screen w-full flex items-center justify-center ' >
            <div className='bg-white w-1/2 h-[80%] rounded-md shadow-md flex flex-col ' >
                <nav className='flex items-center justify-between p-4 ' >
                    <p>{user.email}</p>
                    <button onClick={()=>handleJoinRoom()} type='button' className='bg-blue-400 
                    text-white px-4 py-1 font-medium  rounded-md hover:bg-blue-600  '>Join</button>
                </nav>
                <div className='flex gap-2 w-full h-full ' >
                    <ChatSideBar currentChannel={channel} user={user} changeChannel={setChannel} channelData={channelsUsers} />
                    <ChatBox user={user} channel={channel} chatSocket={socket} channelData={channelsUsers} />
                </div>
            </div>
        </div>
  )
}

export default ChatUI