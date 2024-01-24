import { Controller, Get, Body, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }

  @Post('/')
  async createOrder(@Body() orderData: CreateOrderDto) {
    const newOrder = await this.ordersService.createOrder(orderData);
    return { message: 'Order created successfully', order: newOrder };
  }
}
