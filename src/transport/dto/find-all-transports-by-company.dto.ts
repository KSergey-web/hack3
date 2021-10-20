import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";
import { transportEnum } from "../enums/transport.enum";
import * as mongoose from 'mongoose';

export class FindAllTransportByCompanyDto{
    // @ApiPropertyOptional()
    // @IsOptional()
    // @IsString()
    // @IsEnum(transportEnum)
    // variety?: transportEnum;

    @ApiProperty()
    @IsMongoId()
    company_id: string;
}