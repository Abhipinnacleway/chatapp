import {  IS_UUID, IsBoolean, IsDateString, IsString, IsUUID } from "class-validator";
import { Entity , PrimaryGeneratedColumn , Column   } from "typeorm";
@Entity({name:"chats"})
export class Chat {
    @PrimaryGeneratedColumn()
    @IsUUID()
    _id:string

    @Column()
    @IsUUID()
    send_to:string;

    @Column()
    @IsUUID()
    send_from:string;

    @Column()
    @IsString()
    content:string;

    @Column()
    @IsBoolean()
    toChannel:boolean;

    @Column()
    @IsDateString()
    created_at:Date;


}
