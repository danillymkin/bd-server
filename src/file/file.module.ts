import { Module } from '@nestjs/common';
import { FileServiceImpl } from './file.service';
import { FILE_SERVICE } from './interfaces/file-service.interface';

@Module({
  providers: [
    {
      useClass: FileServiceImpl,
      provide: FILE_SERVICE,
    },
  ],
  exports: [
    {
      useClass: FileServiceImpl,
      provide: FILE_SERVICE,
    },
  ],
})
export class FileModule {}
