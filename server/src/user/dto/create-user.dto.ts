import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    email: string

    @MinLength(6, { message: 'Пароль короче 6 символов'})
    password: string

    
}
