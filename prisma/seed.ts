/* eslint-disable */
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Food with chicken',
      price: 20,
      description: 'healthy food for young dogs',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Food with beef',
      price: 10,
      description: 'healthy food for adult dogs',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Food with duck',
      price: 15,
      description: 'healthy food for young cats',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      address: 'The Grapes of Wrath',
      phone: '43342423',
      totalCost: 10,
      name: "john",
      surname: "Doe",
      deliveryDetails: 'please deliver after 5',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      address: 'The Grapes of Wrat2',
      phone: '43342423',
      totalCost: 10,
      name: "john",
      surname: "Doe",
      deliveryDetails: 'please deliver after 5',
    },
  ];
}

function getOrderItems() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      orderId: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      quantity: 10,
      price: 14,
      comments: 'deliver fast'
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      orderId: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      quantity: 10,
      price: 12,
      comments: 'deliver low'
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map((order) => {
      return db.order.create({ data: order });
    }),
  );

  await Promise.all(
    getOrderItems().map(({ orderId, productId, ...orderData }) => {
      return db.orderItem.create({
        data: {
          ...orderData,
          order: {
            connect: { id: orderId },
          },
          product: {
            connect: { id: productId },
          },
        },
      });
    }),
  );
}

seed();
