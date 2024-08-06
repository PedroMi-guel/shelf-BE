import { IsEmail, IsString, MaxLength } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email:string

    @MaxLength(12)
    @IsString()
    name:string

    @MaxLength(12)
    @IsString()
    lastName:string

    @IsString()
    password:string
}
