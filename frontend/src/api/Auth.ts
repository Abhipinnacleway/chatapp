// Api Methods for Register
export interface user {
    name:string;
    password:string;
    email:string;
}

const URLS={
    'URL': 'http://localhost:3000/',
    'REGISTER_URI':'auth/register',
    'LOGIN_URI':'auth/login',
    'ISAUTHENTICATED_URI':'auth',
}

export const createAccount = async(Payload:user) =>{
    const response = await fetch(`${URLS.URL}${URLS.REGISTER_URI}` , 
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
                
            },

            body:JSON.stringify(Payload)

        }
    ) 
    return response.json();
} 
export interface ILogin {
    email:string;
    password:string;
}

export const LogIn = async (PayLoad:ILogin) =>{
    const response = await fetch (`${URLS.URL}${URLS.LOGIN_URI}` , {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(PayLoad)
    } ) 
    return response.json();
} 


export const checkAuth = async(token:string) =>{
    const response = await fetch(`${URLS.URL}${URLS.ISAUTHENTICATED_URI}`, {
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },

    })
    return response.json()
}