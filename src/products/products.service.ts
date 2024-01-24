import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public async create(authorData: Omit<Product, 'id'>): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: authorData,
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Name is already taken');
      throw error;
    }
  }

  public deleteById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}


