/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}