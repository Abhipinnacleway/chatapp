import React, { useEffect, useState } from 'react';
import { IChannelsUsers, user } from '../pages/ChatUI';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface IChatBox {
  channel: string;
  user: user;
  channelData: { id: string, name: string }[];
  chatSocket: Socket;
}

interface AllChat {
  readonly sender: string;
  readonly msg: string;
  readonly receiver: string;
  readonly date: string;
}

const ChatBox: React.FC<IChatBox> = ({ user, channelData, channel, chatSocket }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [allChats, setAllChats] = useState<AllChat[]>([]);
  const [privateChats, setPrivateChats] = useState<AllChat[]>([]);

  const sendChat = () => {
    let date = new Date();
    let data: AllChat = { sender: user.email, msg: chatMessage, receiver: channel, date: date.toDateString() };
    if (allChats) setAllChats([...allChats, data]);
    else setAllChats([data]);
    chatSocket.emit('conversation', data);
    setChatMessage('');
  };

  useEffect(() => {
    chatSocket.on('conversation_callback', (data: any) => {
      console.log(data);
      setAllChats(data?.chats);
    });
    chatSocket.on('getAllChats_callback', (data: any) => {
      setAllChats(data?.chats);
    });
    chatSocket.on('private_conversation_callback', (data: any) => {
      console.log(data);
      setPrivateChats(data?.chats);
    });
  }, [chatSocket]);

  useEffect(() => {
    chatSocket.emit('getAllChats', { name: channel });
  }, [channel]);

  return (
    <div className='bg-blue-100/20 w-full p-1 flex flex-col'>
      {channel!== '' && (
        <div className='bg-blue-500 capitalize shadow-md w-max p-2 rounded-md text-white'>
          Message to {channel}
        </div>
      )}
      <div className='flex flex-col gap-2' style={{ flex: '1', position: 'relative', width: '100%' }}>
        {allChats &&
          allChats.map((chat, _) => (
            <div key={chat.date + chat.msg} className={` ${chat.sender === user.email? 'translate-x-[200%]   ': 'translate-x-0 '}   relative bg-blue-500 my-2 rounded-md p-2 text-white w-min min-w-[200px] `}>
              <p>{chat.msg}</p>
              <span className='flex gap-2'>
                <p className='text-xs'>{chat.sender!== user.email? chat.sender : null} {chat.date}</p>
              </span>
            </div>
          ))}
        {privateChats &&
          privateChats.map((chat, _) => (
            <div key={chat.date + chat.msg} className={` ${chat.sender === user.email? 'translate-x-[200%]   ' :'translate-x-0 '}   relative bg-blue-500 my-2 rounded-md p-2 text-white w-min min-w-[200px] `}>
              <p>{chat.msg}</p>
              <span className='flex gap-2'>
                <p className='text-xs'>{chat.sender!== user.email? chat.sender : null} {chat.date}</p>
              </span>
            </div>
          ))}
      </div>
      <span className='flex items-center justify-between p-2 gap-2'>
        <textarea
          className='border border-slate-200 rounded-md w-full pl-2 outline-none'
          placeholder='Enter the Message'
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <button className='hover:text-blue-500' onClick={sendChat} type='button'>
          Send
        </button>
      </span>
    </div>
  );
};

export default ChatBox;