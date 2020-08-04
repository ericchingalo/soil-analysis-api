import { Repository, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseService<T, C> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    const data = await this.repository.find();
    return data;
  }

  async findOneById(id: string): Promise<T> {
    const data = await this.repository.findOne({ where: { id } });

    if (!data) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async create(data: C) {
    const dataResult = await this.repository.create(data);

    await this.repository.save(dataResult);

    return dataResult;
  }

  async update(id: string, data: QueryDeepPartialEntity<T>) {
    await this.repository.update(id, data);
    return await this.findOneById(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
