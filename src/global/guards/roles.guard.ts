import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ExtractJwt } from 'passport-jwt'
import { Observable } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'
import { role } from 'src/users/enums/role.enum'
import { User } from 'src/users/interface/user.interface'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(
            context.switchToHttp().getRequest()
        )
        return this.authService
            .getUserFromToken(token)
            .then((user: User) => {
                if (user.role === role.admin) return true
                return false
            })
            .catch((err) => {
                console.log(err)
                return false
            })
    }
}
