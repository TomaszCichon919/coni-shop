/* eslint-disable */
import { IsNotEmpty, IsString, IsInt, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  id: string;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;

  // Other properties if needed
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  totalPrice: number;

  @IsString()
  details: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}