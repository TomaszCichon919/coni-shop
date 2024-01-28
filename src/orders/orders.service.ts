import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { orderItems: true },
    });
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const { orderItems, ...orderData } = createOrderDto;

    const createdOrder = await this.prismaService.order.create({
      data: {
        ...orderData,
        orderItems: {
          create: orderItems.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            comments: item.comments,
            productId: item.id,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return createdOrder;
  }
}
