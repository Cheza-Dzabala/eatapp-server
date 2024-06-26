import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
    @ApiProperty({
        description: 'User email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'User password',
    })
    @IsNotEmpty()
    password: string
}
