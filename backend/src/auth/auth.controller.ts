import { Controller , Post , Body, Get, Res, HttpStatus, Inject, Req } from '@nestjs/common';
import { signUpDto } from "./dto/signUp.dto"
import { signInDto } from "./dto/signIn.dto"
import { AuthService } from './auth.service';
import { Json } from 'sequelize/types/utils';
@Controller('auth')
export class AuthController {
   constructor(@Inject(AuthService) 
    private readonly authService:AuthService
    ){}
    @Post("/register")
    async signUp(@Body() Payload:signUpDto){
        try{
            const data = await this.authService.signUp(Payload);
            return JSON.stringify(data)
        }catch(error){
            return JSON.stringify({stauts:501 , msg:"Something Went Wrong !" })
        }
    }
    @Post("/login")
    async signIn( @Body() Payload:signInDto ){
        try{            
            const { email , password } = Payload;
            const data = await this.authService.signIn(email , password)
            return JSON.stringify(data);
        }catch(error){
            return JSON.stringify({stauts:501 , msg:"Something Went Wrong !" })
        }
    }
    @Get("/")
    async Auth(@Req() req:Request ){
        try{
            let authorization:string = await req.headers["authorization"]
            const data = await this.authService.checkAuth(authorization.split(' ')[1])
            if(data)  return JSON.stringify({status:200 , data:data  , msg:'valid'})
            return JSON.stringify({status:200 , data:null , msg:'not Valid'}) 
        }catch(error){
            return JSON.stringify({stauts:501 , msg:"Something Went Wrong !" })

        }
    }
}
