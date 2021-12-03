import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
    constructor(private readonly authService: AuthService) {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest()
        // get token from request header
        const token = req.headers.authorization
        // separate Bearer from token
        const tokenSplit = token.split(' ')
        // get token from split
        const tokenFromHeader = tokenSplit[1]
        // deserialize token
        const deserializedToken = await this.authService.getUserFromToken(
            tokenFromHeader
        )
        // set token to request
        req.body.user = deserializedToken
        return next.handle()
    }
}
