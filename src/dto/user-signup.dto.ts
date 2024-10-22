import{ IsEmail,IsString } from 'class-validator';

export class UserSignupDto{
   

    @IsString()
    password:string;

    @IsString()
    username:string;
}