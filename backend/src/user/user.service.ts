import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo:Repository<User> 
    ){}
    async findByEmail(email?:string): Promise<User | null> {
        let exsistingUser = await this.userRepo.findOne({where:{
            email:email
        }})
        return exsistingUser
    }
    async createNewUser(email:string , hasPass:string , name:string , salt:string  ){
        let newUser = await this.userRepo.insert({email , name , password:hasPass , salt })
        return newUser;
    }
}
