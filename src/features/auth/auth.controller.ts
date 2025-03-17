import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IUserPayload } from './interfaces/payload.interface';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { UserPayload } from './decorators/user-payload.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const hasUser = await this.userService.hasUser();

    if (hasUser) {
      throw new ForbiddenException();
    }
    const user = await this.userService.createUser(createUserDto);
    const payload: IUserPayload = {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    };
    return this.authService.generateJwt(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload) {
    return this.authService.generateJwt(payload);
  }
}
