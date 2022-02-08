import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Color } from './entities/color.entity';
import { DeleteResult } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ColorsService } from './colors.service';

@ApiTags('Товары')
@Controller('colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @ApiOperation({ summary: 'Получить все цвета' })
  @ApiResponse({ status: HttpStatus.OK, type: [Color] })
  @Get()
  getAll(): Promise<Color[]> {
    return this.colorsService.getAll();
  }

  @ApiOperation({ summary: 'Получить цвет по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Color })
  @Get(':id')
  getById(@Param('id') id: string): Promise<Color> {
    return this.colorsService.getById(id);
  }

  @ApiOperation({ summary: 'Создать цвет' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Color })
  @Post()
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorsService.create(createColorDto);
  }

  @ApiOperation({ summary: 'Обновить цвет' })
  @ApiResponse({ status: HttpStatus.OK, type: Color })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<Color> {
    return this.colorsService.update(id, updateColorDto);
  }

  @ApiOperation({ summary: 'Удалить цвет' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.colorsService.remove(id);
  }
}
