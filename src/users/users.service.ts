import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { User } from './interface/user.interface'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User as UserEntity } from './entity/user.entity'
import { role } from './enums/role.enum'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findAndCount(email: string): Promise<number> {
        return this.userRepository.count({ where: { email } })
    }

    async findOne(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } })
    }

    async create(user: UserDto): Promise<User> {
        const newUser: UserEntity = this.userRepository.create(user)
        await newUser.hashPassword()
        return this.userRepository.save(newUser)
    }

    async getAdmins(): Promise<User[]> {
        return this.userRepository.find({ where: { role: role.admin } })
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({ where: { role: role.user } })
    }
}
