import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AuthenticationInterceptor } from 'src/global/interceptors/user.interceptor'
import { MyOrderDto } from './dto/myorder.dto'
import { OrderDto } from './dto/order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entity/order.entity'
import { OrderService } from './order.service'

@ApiTags('Orders')
@Controller('order')
@UseInterceptors(AuthenticationInterceptor)
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('/mine')
    find(@Body() myOrderDto: MyOrderDto): any {
        return this.orderService.find(myOrderDto.user)
    }

    @Post('/')
    async create(@Body() orderDto: OrderDto): Promise<Order> {
        return this.orderService.create(orderDto)
    }

    @Get('/all')
    findAll(): any {
        return this.orderService.findAll()
    }

    @Get('/:id')
    findOne(@Param('id') id: string): any {
        return this.orderService.findOne(parseInt(id))
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() orderDto: UpdateOrderDto): any {
        this.orderService.update(parseInt(id), orderDto)
    }
}
