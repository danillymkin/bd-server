import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { DeleteResult } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { RoleName } from '../role/enums/role-name.enum';
import { NOTE_SERVICE, NoteService } from './interfaces/note-service.interface';

@ApiTags('Заметки')
@Controller('notes')
export class NoteController {
  constructor(@Inject(NOTE_SERVICE) private noteService: NoteService) {}

  @ApiOperation({ summary: 'Получить все заметки' })
  @ApiResponse({ status: HttpStatus.OK, type: [Note] })
  @Auth(RoleName.ADMIN)
  @Get()
  getAll(): Promise<Note[]> {
    return this.noteService.getAll();
  }

  @ApiOperation({ summary: 'Получить заметку по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Note })
  @Auth(RoleName.ADMIN)
  @Get(':id')
  getById(@Param() { id }: FindOneParamsDto): Promise<Note> {
    return this.noteService.getById(id);
  }

  @ApiOperation({ summary: 'Создать заметку' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Note })
  @Auth(RoleName.ADMIN)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createNoteDto);
  }

  @ApiOperation({ summary: 'Обновить заметку' })
  @ApiResponse({ status: HttpStatus.OK, type: Note })
  @Auth(RoleName.ADMIN)
  @Patch(':id')
  update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.noteService.update(id, updateNoteDto);
  }

  @ApiOperation({ summary: 'Удалить заметку' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Auth(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param() { id }: FindOneParamsDto): Promise<DeleteResult> {
    return this.noteService.remove(id);
  }
}
