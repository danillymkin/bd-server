import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async getAll(): Promise<Note[]> {
    return await this.notesRepository.find();
  }

  async getById(id: number): Promise<Note> {
    return await this.notesRepository.findOne(id);
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    await this.notesRepository.update({ id }, updateNoteDto);
    return await this.notesRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.notesRepository.delete({ id });
  }
}
