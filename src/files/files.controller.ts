import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { editFileName, imageFileFilter } from './utils'

@Controller('files')
export class FilesController {
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './images',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async upload(@UploadedFile() image: Express.Multer.File) {
        const response = {
            originalname: image.originalname,
            filename: image.filename,
        }
        console.log(response)
        return response
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './images' })
    }
}
