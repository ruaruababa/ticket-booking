import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { FindAllRequest } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(options: FindAllRequest): Promise<[User[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortDesc = false,
      searchTerm,
      filterByRole,
    } = options;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Apply search if provided
    if (searchTerm) {
      queryBuilder.where(
        '(user.username LIKE :search OR user.email LIKE :search OR user.firstName LIKE :search OR user.lastName LIKE :search)',
        { search: `%${searchTerm}%` },
      );
    }

    // Apply role filter if provided
    if (filterByRole !== undefined) {
      queryBuilder.andWhere('user.role = :role', { role: filterByRole });
    }

    // Apply sorting
    queryBuilder.orderBy(`user.${sortBy}`, sortDesc ? 'DESC' : 'ASC');

    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    return queryBuilder.getManyAndCount();
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }

  async setPasswordResetToken(
    userId: string,
    token: string,
    expires: Date,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      passwordResetToken: token,
      passwordResetExpires: expires,
    });
  }

  async findByPasswordResetToken(token: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() },
      },
    });
  }
}
