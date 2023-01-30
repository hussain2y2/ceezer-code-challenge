import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Crypto } from '@/common/crypto/crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: +id });
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async store(createUserDto: CreateUserDto): Promise<User> {
    // Hash password
    createUserDto.password = Crypto.hash(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
    });
    return await this.userRepository.save(user);
  }
}