import { IsEnum, IsOptional } from 'class-validator';
import { PaginationProductsDto } from '../../common/dto/pagination-product.dto';
import { OrderStatus, OrderStatusList } from '../../common/enums';

export class PaginationOrderDTO extends PaginationProductsDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Invalid status, availables are ${OrderStatusList}`,
  })
  status?: OrderStatus;
}
