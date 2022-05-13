import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './enities/image.entity';
import { ImageServiceImpl } from './image.service';
import { IMAGE_SERVICE } from './interfaces/image-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
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
export class ImagesModule {}
