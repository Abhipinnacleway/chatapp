import { IS_ALPHA, IS_ALPHANUMERIC, IS_STRING, IsEmail, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm"
@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    _id:string;

    @Column()
    @IsString()
    name:string;
    
    @Column({unique:true})
    @IsEmail()
    email:string;
    
    @Column()
    @IsString()
    // @IS_ALPHANUMERIC()
    password:string;
    
    @Column()
    @IsString()
    salt:string;
    
}