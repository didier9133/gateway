import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '.';
import { IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/common/enums';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderStatusList, {
    message: `Invalid status, availables are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
