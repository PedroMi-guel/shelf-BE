import { IsDate, IsInt, IsNumber, IsPositive } from "class-validator";
import { Element } from "src/element/entities/element.entity";

export class CreateRecordDto {
    @IsNumber()
    @IsInt()
    state:number;

    @IsDate()
    start_time:Date;

    @IsDate()
    end_time:Date;

    @IsNumber()
    @IsInt()
    @IsPositive()
    element:Element;

}
