import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';

import {
  AuthenticationError,
  BaseGraphQLError,
  ForbiddenError,
} from 'src/filters/utils/graphql-errors.util';
import { ExceptionHandlerService } from 'src/integrations/exception-handler/exception-handler.service';

const graphQLPredefinedExceptions = {
  401: AuthenticationError,
  403: ForbiddenError,
};

@Catch(HttpException)
export class HttpExceptionFilter
  implements GqlExceptionFilter<HttpException, BaseGraphQLError | null>
{
  constructor(
    private readonly exceptionHandlerService: ExceptionHandlerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() !== 'graphql') {
      return null;
    }

    return this.catchException(exception);
  }

  catchException(exception: HttpException) {
    const status = exception.getStatus();
    let error: BaseGraphQLError;

    // Capture all 5xx errors and send them to exception handler
    if (status >= 500) {
      this.exceptionHandlerService.captureException(exception);
    }

    if (status in graphQLPredefinedExceptions) {
      error = new graphQLPredefinedExceptions[exception.getStatus()](
        exception.message,
      );
    } else {
      error = new BaseGraphQLError(
        exception.message,
        exception.getStatus().toString(),
      );
    }

    error.stack = exception.stack;
    error.extensions['response'] = exception.getResponse();

    return error;
  }
}
