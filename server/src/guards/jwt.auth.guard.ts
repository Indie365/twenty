import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JsonWebTokenError } from 'jsonwebtoken';

import { assertThrowsGqlError } from 'src/utils/assertThrowsGqlError';
import { getRequest } from 'src/utils/extract-request';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }

  handleRequest(err: any, user: any, info: any) {
    assertThrowsGqlError(user, 'Unauthorized', 'UNAUTHENTICATED');

    if (err) {
      throw err;
    }

    if (info && info instanceof Error) {
      if (info instanceof JsonWebTokenError) {
        info = String(info);
      }

      throw new UnauthorizedException(info);
    }

    return user;
  }
}
