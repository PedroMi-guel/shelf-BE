import { IsDate, IsInt, Min } from "class-validator";

export class CreateRecordDto {

    @IsInt()
    @Min(0)
    state:number

    @IsDate()
    start_time:Date

    @IsDate()
    end_time:Date
}
