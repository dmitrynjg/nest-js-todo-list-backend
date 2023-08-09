import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDto) {
    const userByEmail = await this.usersService.findByEmail(createUser.email);
    if (userByEmail) {
      throw new HttpException(
        'user.register.error.user_by_email_found',
        HttpStatus.FORBIDDEN,
      );
    }
    const userByLogin = await this.usersService.findByLogin(createUser.login);
    if (userByLogin) {
      throw new HttpException(
        'user.register.error.user_by_login_found',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashPassword = await bcrypt.hash(createUser.password, 10);

    const { id, login, email, createdAt } = await this.usersService.create({
      ...createUser,
      password: hashPassword,
    });

    const token = await this.jwtService.signAsync({ id });
    return {
      accessToken: token,
      user: {
        id,
        login,
        email,
        createdAt,
      },
    };
  }

  async login(authUser: AuthUserDto) {
    const findUser = await this.usersService.findByLoginOrEmail(authUser.login);
    const isEqualPassword = findUser
      ? await bcrypt.compare(authUser.password, findUser.password)
      : false;

    if (!findUser || !isEqualPassword) {
      throw new HttpException(
        'user.auth.error.user_not_found',
        HttpStatus.FORBIDDEN,
      );
    }

    const token = await this.jwtService.signAsync({
      id: findUser.id,
    });

    return {
      accessToken: token,
      user: {
        id: findUser.id,
        login: findUser.login,
        email: findUser.email,
        createdAt: findUser.createdAt,
        updateAt: findUser.updatedAt,
      },
    };
  }
}
