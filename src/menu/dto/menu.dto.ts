import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class MenuDto {
    @ApiProperty({
        description: 'Menu name',
    })
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Menu description',
    })
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: 'Menu image path',
    })
    @IsNotEmpty()
    image: string
}
