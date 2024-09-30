import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger('RpcException');

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();
    let statusCode = 500;
    let message = 'Internal server error';

    if (rpcError.toString().includes('There are no subscribers')) {
      message = 'No subscribers found listening to this message.';
    }

    if (
      typeof rpcError === 'object' &&
      'statusCode' in rpcError &&
      'message' in rpcError
    ) {
      statusCode = rpcError.statusCode as number;
      message = rpcError.message as string;
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
    return new Observable();
  }
}
