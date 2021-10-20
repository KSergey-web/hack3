import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsMongoId, IsString, MinLength } from "class-validator";
import { transportEnum } from "../enums/transport.enum";
import * as mongoose from 'mongoose';

export class CreateTransportDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsString()
    @IsEnum(transportEnum)
    variety: transportEnum;

    @ApiProperty()
    @IsMongoId()
    company_id: string;
}
