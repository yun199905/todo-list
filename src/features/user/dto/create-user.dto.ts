import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import {
  USER_PASSWORD_MAX_LEN,
  USER_PASSWORD_MIN_LEN,
  USER_USERNAME_MAX_LEN,
  USER_USERNAME_MIN_LEN,
} from 'src/common/constants/user.const';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @MinLength(USER_USERNAME_MIN_LEN)
  @MaxLength(USER_USERNAME_MAX_LEN)
  readonly username: string;

  @MinLength(USER_PASSWORD_MIN_LEN)
  @MaxLength(USER_PASSWORD_MAX_LEN)
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(Role)
  readonly role: Role;
}
