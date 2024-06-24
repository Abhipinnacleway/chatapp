import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { genSalt , hash } from 'bcrypt'
import { IUser } from "./interface/IUser"
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
    @Inject(UserService)
    @InjectRepository(User)
    private userService:UserService, 
    private JwtService:JwtService
  
){}    
    async signUp(Payload:IUser) {
        const { email , password , name } = Payload
        let exsistingUser = await this.userService.findByEmail(email);
        if(exsistingUser) return {status:200 , msg:"user already exist !" };
        let passSalt = await genSalt();
        let hashPassword = await this.hashPassword(password , passSalt); 
        let newUser = await this.userService.createNewUser(email , hashPassword , name , passSalt )
        let token = await this.signIn(email , password);
        return {status:200 , data:token , msg:"User created Successfully !" };
        
    }

    async hashPassword(password:string , salt:string ){
        return await hash(password , salt);
    }

    async signIn(email:string , password:string){
        let exsistingUser = await this.userService.findByEmail(email);
        if(!exsistingUser) return {status:400 , msg:'Account does not exist !'};
        let hashPassword = await this.hashPassword(password , exsistingUser.salt );
        if(hashPassword !== exsistingUser.password ) return {status:200 , msg:"Password is Incorrect !"};
        const payload = { id:exsistingUser._id , user:exsistingUser.email   };
        const token = await this.JwtService.signAsync(payload);
        return { status:200 , msg:"Login Successfull"  , token  }


    }   
    async checkAuth(token:string){
        try{
            let res = await this.JwtService.verifyAsync(token);
            return res ;
        }catch(err){
            return null
        }
    }
}
