import { Injectable } from '@nestjs/common';


export type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    password:string,
    gender: boolean // 0 male - 1 female
}

@Injectable()
export class UsersService {

    private readonly users:Array<User> = [];

    async findUser(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async addUser(user: User){
        this.users.push(user);
        return user;
    }

    
        

}
