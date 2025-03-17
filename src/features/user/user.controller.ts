import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SearchPipe } from 'src/core/pipes';
import { SearchDto } from 'src/core/bases';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/core/guards';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query(SearchPipe) searchDto: SearchDto) {
    return this.userService.findUsers(searchDto, '-password');
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    console.log('createUser controller test');
    const { username, email } = userData;
    const exist = await this.userService.existUser({
      $or: [{ username }, { email }],
    });

    if (exist) throw new ConflictException('username or email already exists');

    const user = await this.userService.createUser(userData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const response = await this.userService.deleteUser(id);

    if (!response) throw new ForbiddenException();

    return response;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(
      id,
      updateUserDto,
      '-password',
    );

    if (!user) throw new ForbiddenException();

    return user;
  }
}
