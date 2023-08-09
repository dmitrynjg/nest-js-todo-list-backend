import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Folder } from 'src/modules/folders/entities/folder.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Table({
  tableName: 'task',
})
export class Task extends Model<Task> {
  @ApiProperty({
    example: '3cfb55bf-3387-4e6e-8aca-e31f3b113873',
    description: 'id задачи',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;
  @ApiProperty({
    example: 'Test',
    description: 'Загаловок задачи',
  })
  @Column({ allowNull: false })
  title: string;

  @ApiProperty({
    example: 10,
    description: 'Позиция в выводе задачи',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  position: number;

  @ApiProperty({
    example: true,
    description: 'Выполнена задачи или нет',
  })
  @Column({ field: 'is_done', type: DataType.BOOLEAN, allowNull: false })
  isDone: boolean;

  @ApiProperty({
    example: '2023-08-09T03:02:00.344Z',
    description: 'Дата создания задачи',
  })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-08-09T03:02:00.344Z',
    description: 'Дата обновления задачи',
  })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => Folder, { foreignKey: 'folderTask', as: 'folder' })
  folder: Folder;

  @BelongsTo(() => User, { foreignKey: 'authorTask', as: 'author' })
  author: User;
}
