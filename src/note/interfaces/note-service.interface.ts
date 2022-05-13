import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { DeleteResult } from 'typeorm';

export const NOTE_SERVICE = 'NOTE_SERVICE';

export interface NoteService {
  getAll(): Promise<Note[]>;

  getById(id: number): Promise<Note>;

  create(createNoteDto: CreateNoteDto): Promise<Note>;

  update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note>;

  remove(id: number): Promise<DeleteResult>;
}
