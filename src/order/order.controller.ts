import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { OrderDto } from './dto/order.dto'
import { Order } from './entity/order.entity'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Body() orderDto: OrderDto): Promise<Order> {
        return this.orderService.create(orderDto)
    }

    @Get('/all')
    findAll(): any {
        return this.orderService.findAll()
    }
}
