import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
//import { paginator } from 'src/uttils/query/query.uttils';
import { User } from '../users/entities/user.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FoldersRepository } from './folders.repository';

@Injectable()
export class FoldersService {
  constructor(private foldersRepository: FoldersRepository) {}
  async checkIsAuthorFolder(
    id: string | number,
    author: string | number,
  ): Promise<boolean> {
    const folder: any = await this.foldersRepository.findById({
      id,
      options: {
        attributes: ['id', 'authorFolder'],
        where: {
          authorFolder: author,
          id,
        },
        raw: true,
      },
    });
    if (!folder || folder.authorFolder !== author) {
      throw new HttpException(
        'folder.error.check_is_author',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }

  create({
    folder,
    author,
  }: {
    folder: CreateFolderDto;
    author: string | number;
  }) {
    return this.foldersRepository.create({
      title: folder.title,
      emoji: folder.emoji,
      authorFolder: author,
    });
  }

  async getUserFolders(query: FindOptions) {
    query.include = [{ model: User, attributes: ['login', 'email'] }];
    return this.foldersRepository.findAllWithPage(query);
  }

  findById(id: string | number) {
    return this.foldersRepository
      .findById({ id, options: { raw: true } })
      .then((folder) => (folder ? folder : {}));
  }

  async update({
    folder,
    author,
  }: {
    folder: UpdateFolderDto;
    author: string | number;
  }) {
    const { id, ...updateData } = folder;
    if (Object.keys(updateData).length === 0) {
      throw new HttpException(
        'folder.error.update_not_data',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.checkIsAuthorFolder(id, author);
    await this.foldersRepository.update(
      { ...updateData, updateAt: new Date() },
      {
        where: {
          id,
        },
      },
    );
    return { ok: true };
  }
  async remove({
    id,
    author,
  }: {
    id: number | string;
    author: string | number;
  }) {
    await this.checkIsAuthorFolder(id, author);
    await this.foldersRepository.deleteById(id);
    return { ok: true };
  }
}
