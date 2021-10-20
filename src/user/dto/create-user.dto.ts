import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, isNumber, IsNumber, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    login: string;
  
    @IsString()
    @MinLength(4)
    @ApiProperty()
    password: string;
  }
  
  export class RegisterDTO extends LoginDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly surname: string;
  }

export class TestDTO {
    @Transform(({value}) => {
        return Number(value)
    })
    @IsNumber()
    latitude: number;

    @Transform(({value}) => {
        return Number(value)
    })
    @IsNumber()
    longitude: number
}