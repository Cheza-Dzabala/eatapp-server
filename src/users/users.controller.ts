import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from './interface/user.interface'
import { UsersService } from './users.service'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { RolesGuard } from 'src/global/guards/roles.guard'

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers()
    }
    @Get('/admin')
    async getAdmin(): Promise<User[]> {
        return await this.usersService.getAdmins()
    }
}
