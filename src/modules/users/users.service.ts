import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserWithIdDto } from './dto/update-user.dto';
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
      .then((user) => {
        delete user.password;
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

  async update(updateUserDto: UpdateUserWithIdDto) {
    const { id, ...updateData } = updateUserDto;
    if (updateData.password && !updateData.passwordConfirm) {
      throw new HttpException(
        'user.validate.error.passwordConfirm',
        HttpStatus.FORBIDDEN,
      );
    }
    if (!Object.keys(updateData).length) {
      throw new HttpException(
        'user.auth.error.not_data_updated',
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.usersRepository.findById({ id });
    if (!user) {
      throw new HttpException(
        'user.auth.error.user_not_found',
        HttpStatus.FORBIDDEN,
      );
    }
    return user.save(updateData).then((res) => {
      delete res.dataValues.password;
      return res;
    });
    //this.usersRepository.update(updateData, { where: { id: id } });
  }
}
