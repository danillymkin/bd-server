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
import { ClientsService } from './clients.service';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { DeleteResult } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Получить всех клиентов' })
  @ApiResponse({ status: HttpStatus.OK, type: [Client] })
  @Get()
  getAll(): Promise<Client[]> {
    return this.clientsService.getAll();
  }

  @ApiOperation({ summary: 'Получить клиента по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Client })
  @Get(':id')
  getById(@Param() { id }: FindOneParamsDto): Promise<Client> {
    return this.clientsService.getById(id);
  }

  @ApiOperation({ summary: 'Создать клиента' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Client })
  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Обновить клиента' })
  @ApiResponse({ status: HttpStatus.OK, type: Client })
  @Patch(':id')
  update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.update(id, updateClientDto);
  }

  @ApiOperation({ summary: 'Удалить клиента' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Delete(':id')
  remove(@Param() { id }: FindOneParamsDto): Promise<DeleteResult> {
    return this.clientsService.remove(id);
  }
}
