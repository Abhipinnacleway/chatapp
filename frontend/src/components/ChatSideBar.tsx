import React, { useEffect } from 'react'
import { IChannelsUsers, user } from '../pages/ChatUI'
import { Route, Routes } from 'react-router'
import ChatBox from './ChatBox'
import { BrowserRouter, Link } from 'react-router-dom'
interface IChatSideBar {
  changeChannel:React.Dispatch<React.SetStateAction<string>>;
    user:user
    channelData:{id:string , name:string}[]
    currentChannel:string;
}

const ChatSideBar:React.FC<IChatSideBar> = ({user , channelData , changeChannel , currentChannel }) => {
  useEffect(()=>{
    console.log(channelData)
  },[channelData])
  return (
    <div className=' flex justify-start gap-1 flex-col min-w-[150px] bg-gray-100 h-full rounded-bl-md   border-r-black/20 border p-1    '   >
       {currentChannel !== '' && (<button className='shadow-md text-start pl-2 py-1 rounded-md  bg-blue-100 hover:to-blue-200 w-full ' onClick={() => changeChannel('room')} >
          room
        </button>)}
      {channelData && channelData.map((channelUser) =>{
        return channelUser.name !== user.email ? (
        <button className={` shadow-md  text-start pl-2 py-1 rounded-md  bg-blue-100 hover:to-blue-200 w-full ${channelUser.name === currentChannel ? 'bg-blue-600' : '' }  `} onClick={() => changeChannel(channelUser.name)} key={channelUser.id}>
          {channelUser.name}
          </button>
      ) : null
    })}
    </div>

  )
}

export default ChatSideBar