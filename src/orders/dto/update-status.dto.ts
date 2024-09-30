import { IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/common/enums';

export class UpdateStatusOrderDto {
  @IsEnum(OrderStatusList, {
    message: `Invalid status, availables are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
