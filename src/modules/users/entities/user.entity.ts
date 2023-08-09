import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Folder } from 'src/modules/folders/entities/folder.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @ApiProperty({
    description: 'id пользователя',
    example: '4b481f9f-c90f-45e9-aeed-2558960ef330',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;
  @ApiProperty({
    description: 'Email пользователя',
    example: 'test@example.com',
  })
  @Unique
  @IsEmail
  @Column
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456Di',
  })
  @Column({ allowNull: false })
  password: string;

  @ApiProperty({
    description: 'Логин пользователя',
    example: 'test',
  })
  @Unique
  @Column
  login: string;

  @ApiProperty({
    description: 'Дата создания пользователя',
    example: '2023-08-09T01:56:11.094Z',
  })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата изменения данных у пользователя',
    example: '2023-08-09T01:56:11.094Z',
  })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @HasMany(() => Folder, 'authorFolder')
  folders: Folder[];

  @HasMany(() => Task, 'authorTask')
  task: Task[];
}
