import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationProductsDto } from 'src/common/dto/pagination-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject('NATS_SERVICE') private client: ClientProxy) {}
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.client.send({ cmd: 'create' }, body);
  }
  @Get()
  findAll(@Query() query: PaginationProductsDto) {
    return this.client.send({ cmd: 'findAll' }, query);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    //forma de hacerlo con un observable

    // return this.client.send({ cmd: 'findOne' }, { id }).pipe(
    //   catchError((error) => {
    //     throw new RpcException(error);
    //   }
    // ));

    //forma de hacerlo con una promesa
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'findOne' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.client.send({ cmd: 'update' }, { id, ...body }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
