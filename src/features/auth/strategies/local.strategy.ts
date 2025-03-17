import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IUserPayload } from '../interfaces/payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: IUserPayload = {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    };
    return payload;
  }
}
