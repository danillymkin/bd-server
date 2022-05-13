import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteService } from './interfaces/note-service.interface';

@Injectable()
export class NoteServiceImpl implements NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  public async getAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  public async getById(id: number): Promise<Note> {
    return await this.noteRepository.findOne(id);
  }

  public async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNoteDto);
    return await this.noteRepository.save(note);
  }

  public async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    await this.noteRepository.update({ id }, updateNoteDto);
    return await this.noteRepository.findOne(id);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.noteRepository.delete({ id });
  }
}
