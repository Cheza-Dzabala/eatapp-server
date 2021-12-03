import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerDocumentOptions,
} from '@nestjs/swagger'

async function bootstrap() {
    // Cors configuration
    const options = {
        origin: '*',
    }
    const config = new DocumentBuilder()
        .setTitle('EatApp API guide')
        .setDescription('Eatapp API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    const swaggerOptions: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey,
    }

    const app = await NestFactory.create(AppModule)
    const document = SwaggerModule.createDocument(app, config, swaggerOptions)
    SwaggerModule.setup('api', app, document)
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors(options)
    await app.listen(3000)
}
bootstrap()
