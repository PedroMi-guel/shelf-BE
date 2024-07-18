import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateElementDto {
    @MinLength(3)
    @IsString()
    name:string

    @IsString()
    @MinLength(3)
    description:string

    @IsNumber()
    @IsPositive()
    @Type(() => Number )
    category:Category
}
