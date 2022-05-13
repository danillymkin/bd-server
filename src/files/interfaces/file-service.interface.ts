import { Express } from 'express';

export const FILE_SERVICE = 'FILE_SERVICE';

export interface FileService {
  createFile(file: Express.Multer.File): Promise<string>;
}
