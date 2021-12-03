import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { role } from '../enums/role.enum'

export class UserDto {
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

    @ApiProperty({
        description: 'User first name',
    })
    @IsNotEmpty()
    firstName: string

    @ApiProperty({
        description: 'User last name',
    })
    @IsNotEmpty()
    lastName: string

    @ApiProperty({
        description: 'User phone number',
    })
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({
        description: 'User role',
        enum: role,
        enumName: 'role',
    })
    @IsNotEmpty()
    role: role

    @ApiProperty({
        description: 'User preferred name',
    })
    @IsNotEmpty()
    preferredName: string
}
