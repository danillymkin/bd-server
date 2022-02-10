import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async getAll(): Promise<Client[]> {
    return await this.clientsRepository.find();
  }

  async getById(id: number): Promise<Client> {
    return await this.clientsRepository.findOne(id, {
      relations: ['notes'],
    });
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(createClientDto);
    return await this.clientsRepository.save(client);
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clientsRepository.update({ id }, updateClientDto);
    return await this.clientsRepository.findOne(id, {
      relations: ['notes'],
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.clientsRepository.delete({ id });
  }
}
