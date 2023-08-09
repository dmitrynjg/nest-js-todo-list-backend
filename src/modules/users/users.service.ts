import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository
      .create({
        login: createUserDto.login,
        password: createUserDto.password,
        email: createUserDto.email,
      })
      .then((res) => {
        const { password, ...user } = res;
        return user;
      });
  }

  findByEmail(email) {
    return this.usersRepository.find({ where: { email }, raw: true });
  }

  findByLogin(login) {
    return this.usersRepository.find({ where: { login }, raw: true });
  }

  async findByLoginOrEmail(payload: string) {
    return this.usersRepository.find({
      where: {
        [Op.or]: {
          email: payload,
          login: payload,
        },
      },
    });
  }

  findById(id: string | number) {
    return this.usersRepository.findById({
      id,
      options: {
        attributes: ['id', 'login', 'email', 'createdAt', 'updatedAt'],
      },
    });
  }
}
