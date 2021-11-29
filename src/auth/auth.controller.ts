import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'
import { LoginUserDto } from 'src/users/dto/loginUser.dto'
import { UserDto } from 'src/users/dto/user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }

    @Post('register')
    async register(@Body() userDto: UserDto) {
        return this.authService.register(userDto)
    }
}
