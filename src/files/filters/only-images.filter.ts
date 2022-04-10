import { BadRequestException } from '@nestjs/common';
import { Express } from 'express';

export const onlyImagesFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(null, true);
  }
  return callback(
    new BadRequestException(
      'Разрешены только изображения с расширениями: jpg, jpeg, png',
    ),
    false,
  );
};
