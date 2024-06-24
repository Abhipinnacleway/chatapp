import { IS_ALPHA, IS_ALPHANUMERIC, IS_STRING, IsDateString, IsEmail, IsString, IsUUID, isDateString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm"
@Entity({name:"channels"})
export class Channel {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    _id:string;

    @Column()
    @IsString()
    name:string;
    
    @Column()
    @IsDateString()
    created_at:Date;
    
}