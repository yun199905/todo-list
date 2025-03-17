import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { CommonUtility } from 'src/core/utils/common.utility';
import { IUserPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.UserService.findUser({
      username,
    });
    const { hash } = CommonUtility.encrypyBySalt(
      password,
      user?.password?.salt,
    );

    if (!user || user.password.hash !== hash) {
      return null;
    }
    return user;
  }

  generateJwt(payload: IUserPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
