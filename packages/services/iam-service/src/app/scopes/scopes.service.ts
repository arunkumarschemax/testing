import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scopes } from './entites/scopes.entity';

@Injectable()
export class ScopeService {
  constructor(
    @InjectRepository(Scopes)
    private readonly scopeRepository: Repository<any>,
  ) { }

  async create(scopeData: any): Promise<any> {
    const scope = this.scopeRepository.create(scopeData);
    return await this.scopeRepository.save(scope);
  }

  async findAll(): Promise<any[]> {
    return await this.scopeRepository.find();
  }

  async findById(id: number): Promise<any> {
    return await this.scopeRepository.findOne({});
  }

  async update(id: number, scopeData: any): Promise<any> {
    await this.scopeRepository.update(id, scopeData);
    return await this.scopeRepository.findOne({});
  }

  async remove(id: number): Promise<void> {
    await this.scopeRepository.delete(id);
  }
}
