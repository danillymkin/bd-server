import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImageServiceImpl } from './image.service';
import { IMAGE_SERVICE } from './interfaces/image-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [
    {
      useClass: ImageServiceImpl,
      provide: IMAGE_SERVICE,
    },
  ],
  exports: [
    {
      useClass: ImageServiceImpl,
      provide: IMAGE_SERVICE,
    },
  ],
})
export class ImageModule {}
