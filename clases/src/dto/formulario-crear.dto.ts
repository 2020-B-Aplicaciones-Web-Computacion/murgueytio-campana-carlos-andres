import {
    IsEmail,
    IsEmpty, IsIn,
    IsNotEmpty, IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString,
    Length,
    MaxLength,
    MinLength,
    minLength
} from "class-validator";

export class FormularioCrearDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    nombre: string;

    @IsNotEmpty()
    @Length(10)
    @IsNumberString()
    cedula: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    edad: number;

    @IsOptional()
    @IsIn([true,false])
    soltero: boolean;

}