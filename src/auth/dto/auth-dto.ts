import { IsEmail, IsString, MaxLength } from "class-validator"

export class AuthDTO {
    @IsEmail()
    @IsString()
    email:string

    @IsString()
    password:string
}
