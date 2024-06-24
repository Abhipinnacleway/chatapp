import { IS_ALPHA, IS_ALPHANUMERIC, IS_STRING, IsDateString, IsEmail, IsString, IsUUID, isDateString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm"
@Entity({name:"members"})
export class Member {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    _id:string;

    @Column()
    @IsUUID()
    member_id:string;
    
    @Column()
    @IsUUID()
    channel_id:string

    @Column()
    @IsDateString()
    created_at:Date;
    
}