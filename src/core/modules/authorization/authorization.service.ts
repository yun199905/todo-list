import { Inject, Injectable } from '@nestjs/common';
import { AUTHORIZATION_ENFORCER } from './constants/token.const';
import { Enforcer } from 'casbin';
import { AuthorizationAction } from './enums/action.enum';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(AUTHORIZATION_ENFORCER) private readonly enforer: Enforcer,
  ) {}

  checkPermission(subject: string, object: string, action: string) {
    return this.enforer.enforce(subject, object, action);
  }

  mappingAction(method: string): AuthorizationAction {
    switch (method.toUpperCase()) {
      case 'GET':
        return AuthorizationAction.READ;
      case 'POST':
        return AuthorizationAction.CREATE;
      case 'PATCH':
      case 'PUT':
        return AuthorizationAction.UPDATE;
      case 'DELETE':
        return AuthorizationAction.DELETE;
      default:
        return AuthorizationAction.NONE;
    }
  }
}
