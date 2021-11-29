import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDto {
    @IsNotEmpty() @IsEmail() email: string
    @IsNotEmpty() password: string
    @IsNotEmpty() firstName: string
    @IsNotEmpty() lastName: string
    @IsNotEmpty() phoneNumber: string
    @IsNotEmpty() preferredName: string
}
