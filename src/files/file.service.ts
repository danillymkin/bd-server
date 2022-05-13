import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { FileService } from './interfaces/file-service.interface';

@Injectable()
export class FileServiceImpl implements FileService {
  public async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileExtension = path.extname(file.originalname);
      const fileName = uuid.v4() + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Ошибка записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
