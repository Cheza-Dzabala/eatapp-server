import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from 'src/users/dto/loginUser.dto'
import { UserDto } from 'src/users/dto/user.dto'
import { User } from 'src/users/interface/user.interface'
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(userCredentials: LoginUserDto): Promise<any> {
        const user = await this.usersService.findOne(userCredentials.email)
        if (
            user &&
            (await bcrypt.compare(userCredentials.password, user.password))
        ) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(userCredentials: LoginUserDto) {
        const user = await this.validateUser(userCredentials)
        if (!user) {
            throw new UnauthorizedException()
        }
        return {
            message: 'login successful',
            data: {
                user,
                access_token: this.jwtService.sign(user),
            },
        }
    }

    async register(user: UserDto): Promise<User> {
        const userExists = await this.usersService.findAndCount(user.email)
        if (userExists > 0) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT)
        }
        return await this.usersService.create(user)
    }
}
