import { io ,Socket  } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

let socketConnection: Socket<DefaultEventsMap, DefaultEventsMap>;

export const initSocket = () => {
    if(!socketConnection){
        socketConnection = io("http://localhost:3000")
    }
    return socketConnection;
    
}




