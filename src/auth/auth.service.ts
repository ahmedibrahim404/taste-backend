import { Injectable } from '@nestjs/common';
import { check } from 'prettier';
import { ErrorType } from 'src/error/error.type';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    private Errors:Array<string> = [
      "Username must be between 6 and 12 characters",
      "Password must be at least 12 characters",
      "Email is not valid"
    ];

    async validateUser(username: string, password: string): Promise<User> {
      const user = await this.usersService.findUser(username);
      if (user && user.password == password) return user;
      return null;
    }  

    async usernameExist(username: string): Promise<Boolean> {
      const user = await this.usersService.findUser(username);
      if (user) return true;
      return false;
    }  




    checkValidUsername(username: string):boolean{
      return username.length >= 6 && username.length <= 12;
    }

    checkValidPassword(password: string):boolean{
      return password.length >= 12;
    }

    checkValidEmail(email: string):boolean{
      return true;
    }

    checkValidUser(user: User){
      if(!this.checkValidUsername(user.username)) return 0;
      if(!this.checkValidPassword(user.password)) return 1;
      if(!this.checkValidEmail(user.email)) return 2;
      return 3;
    }

    async createUser(user: User):Promise<User | ErrorType>{
      var check = this.checkValidUser(user);
      if(check==3){
        return this.usersService.addUser(user);
      }
      return {
        success: false,
        error: this.Errors[check]
      }      
    }

}
