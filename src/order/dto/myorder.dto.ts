import { IsNotEmpty } from 'class-validator'
import { User } from 'src/users/entity/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class MyOrderDto {
    @IsNotEmpty()
    user: User
}
