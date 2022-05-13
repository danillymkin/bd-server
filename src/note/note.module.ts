import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteServiceImpl } from './note-service-impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NOTE_SERVICE } from './interfaces/note-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [
    {
      useClass: NoteServiceImpl,
      provide: NOTE_SERVICE,
    },
  ],
})
export class NoteModule {}
