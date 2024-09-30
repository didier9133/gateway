import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationOrderDTO, UpdateStatusOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('NATS_SERVICE') private client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationOrderDTO: PaginationOrderDTO) {
    return this.client
      .send('findAllOrders', {
        ...paginationOrderDTO,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Put(':id')
  update(
    @Body() updateStatusOrderDto: UpdateStatusOrderDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.client
      .send('changeOrderStatus', {
        status: updateStatusOrderDto.status,
        id,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
