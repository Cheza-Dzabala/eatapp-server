import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    // Cors configuration
    const options = {
        origin: '*',
    }
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors(options)
    await app.listen(3000)
}
bootstrap()
