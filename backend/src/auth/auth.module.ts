import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./contants"
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports:[UserModule ,TypeOrmModule.forFeature([User]) , JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1w' },
      }),],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[TypeOrmModule]
})
export class AuthModule {}
