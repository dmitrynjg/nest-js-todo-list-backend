import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Table({
  tableName: 'folder',
})
export class Folder extends Model<Folder> {
  @ApiProperty({
    example: '0b74aa22-17d7-414c-88de-97f1721097fb',
    description: 'uuid папки',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'Title',
    description: 'Заголовок папки',
  })
  @Column({ allowNull: false })
  title: string;

  @ApiProperty({
    example: '⌚️',
    description: 'Emoji папки',
  })
  @Column({ allowNull: false })
  emoji: string;

  @ApiProperty({
    example: '2023-08-09T02:43:34.936Z',
    description: 'Дата создания папки',
  })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-08-09T02:43:34.936Z',
    description: 'Дата изменения папки',
  })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @HasMany(() => Task, 'folderTask')
  tasks: Task[];

  @BelongsTo(() => User, { foreignKey: 'authorFolder', as: 'author' })
  author: User;
}
