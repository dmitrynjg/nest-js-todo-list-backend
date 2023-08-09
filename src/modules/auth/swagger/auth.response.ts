import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

export class AuthSwaggerSchema {
  @ApiProperty({
    description: 'Access Token для авторизации',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNzdiZWU3LWYyMDAtNGJhNy1iYzIzLTdjZjRjMDJkMzY3YiIsImlhdCI6MTY5MTU0NjI4NiwiZXhwIjoxNjkxNjMyNjg2fQ.xVoblO3G-9I-Mnv6Jt03vdtvuP6DMzFGP_RNRwhv3wc',
  })
  accessToken: string;
  @ApiProperty({ description: 'Пользоватль' })
  user: User;
}
