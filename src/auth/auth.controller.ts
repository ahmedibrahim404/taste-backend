import { Controller, Get, Post, Req, Request } from '@nestjs/common';
import { User } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ErrorType } from '../error/error.type'
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    @Post('register')
    async registerUser(@Request() req): Promise<User | ErrorType> {
        const user={...req.body};
        return await this.authService.createUser(user).then((res) => {
            return res;
        });
    }


    @Post('login')
    async loginUser(@Request() req): Promise<User | ErrorType> {
        const username=req.body.username;
        const password=req.body.password;

        return await this.authService.validateUser(username, password).then((user) => {
            if(user) return {
                success:true,
                ...user
            };

            return {
                success:false,
                error: "Wrong Password or Username"
            }
        });
    }
}
