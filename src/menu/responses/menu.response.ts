import { ApiProperty } from '@nestjs/swagger'

export class MenuResponse {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    image: string
}
