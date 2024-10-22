import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;  

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    user: string;
}
