/* eslint-disable prettier/prettier */

import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateCategoryDto {
    @MinLength(3)
    @MaxLength(45)
    @IsString()
    name:string

    @MinLength(3)
    @MaxLength(25)
    @IsString()
    description:string 

    @MinLength(3)
    @MaxLength(45)
    @IsString()
    image:string
}