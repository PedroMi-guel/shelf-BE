import { IsArray, IsDate, IsInt, IsNumber, IsPositive } from "class-validator";
import { Element } from "src/element/entities/element.entity";
import { User } from "src/user/entities/user.entity";

export class CreateRecordDto {
    @IsNumber()
    @IsInt()
    state:number;

    @IsNumber()
    start:number;

    @IsNumber()
    end:number;

    @IsArray()
    elements:number[];

    @IsInt()
    @IsNumber()
    user:User;
}
