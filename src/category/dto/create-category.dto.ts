import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MinLength(3)
    @IsString()
    name: string;

    @IsString()
    @MinLength(3)
    description:string;
}
