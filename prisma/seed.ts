/* eslint-disable */
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Wild Nature Deer 300g',
      img: '/images/products/wild_nature_deer.png',
      price: 5,
      description: '69% of pure meat content. Lean meat rich im protein and unsaturated fatty acids. Includes natural colagen and vegetables',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Wild Nature Turkey 300g',
      img: '/images/products/wild_nature_turkey.png',
      price: 5,
      description: '72% of pure meat content. Lean meat rich with nutieruents and vitamins. Easily assimilable and easily digestible protein',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17758',
      name: 'Wild Nature Duck 300g',
      img: '/images/products/wild_nature_duck.png',
      price: 5,
      description: 'Ideal snacks for all animals. 98% of pork and duck meat. No flavor enhancers and preservatives',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a14256',
      name: 'Wild Nature Beef 300g',
      img: '/images/products/wild_nature_beef.png',
      price: 5,
      description: '72% of pure meat content. lean meat rich with nutrients, vitamins and trace elements. Easily assimilable and easily digestible protein',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Outdoor Jar Beef 400g',
      img: '/images/products/jar_beef.jpg',
      price: 8,
      description: '100% natural high quality ingredients. Balanced meal for small and medium dogs. Lean meat ritch with nutieruents and vitamins',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f4789e56',
      name: 'Outdoor Jar Chicken 400g',
      img: '/images/products/jar_chicken.jpg',
      price: 8,
      description: '100% natural high quality ingredients. Balanced meal for small and medium dogs. Lean meat ritch with nutieruents and vitamins',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a18258',
      name: 'Outdoor Jar Lamb 400g',
      img: '/images/products/jar_lamb.jpg',
      price: 8,
      description: '98% of pork and lamb meat. Healthy snack with added linen and seaweed. Lean meat ritch with nutieruents and vitamins',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c555c8a17858',
      name: 'Outdoor Jar Turkey 400g',
      img: '/images/products/jar_turkey.jpg',
      price: 8,
      description: '100% natural ingredients. Balanced meal for adult dogs. Lean meat ritch with nutieruents and vitamins',
    },

    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a47256',
      name: 'Wild Nature Turkey 450g',
      img: '/images/products/wild_nature_turkey.png',
      price: 10,
      description: '72% of pure meat content. Lean meat rich with nutieruents and vitamins. Easily assimilable and easily digestible protein',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3819e56',
      name: 'Outdoor Jar Lamb 500g',
      img: '/images/products/jar_lamb.jpg',
      price: 12,
      description: 'Ideal snacks for all animals. 98% of pork and turkey meat. Good source of natural collagen',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17298',
      name: 'Mix Jar For Dogs 500g',
      img: '/images/products/jar_mix.jpg',
      price: 14,
      description: 'Ideal snacks for all animala. 98% of pork meat. Added vegetables, linen and seaweed for extra nutrition',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a27758',
      name: 'Wild Nature Deer 450g',
      img: '/images/products/wild_nature_deer.png',
      price: 10,
      description: '69% of pure meat content. Lean meat rich im protein and unsaturated fatty acids. Includes natural colagen and vegetables',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a13256',
      name: 'Wild Nature Beef 450g',
      img: '/images/products/wild_nature_beef.png',
      price: 10,
      description: '72% of pure meat content. lean meat rich with nutrients, vitamins and trace elements. Easily assimilable and easily digestible protein',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f4789r56',
      name: 'Outdoor Jar Chicken 500g',
      img: '/images/products/jar_chicken.jpg',
      price: 12,
      description: '100% natural high quality ingredients. Balanced meal for small and medium dogs. No added cereals and GMO',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c539c8a18258',
      name: 'Outdoor Jar Beef 500g',
      img: '/images/products/jar_beef.jpg',
      price: 20,
      description: 'Ideal snacks for all animals. Lean meat rich with nutieruents and vitamins.98% of pork and turkey meat',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c555c1a17758',
      name: 'Wild Nature Duck 450g',
      img: '/images/products/wild_nature_duck.png',
      price: 15,
      description: 'Ideal snacks for all animals. 98% of pork and duck meat. Lean meat rich with nutieruents and vitamins',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      address: 'Temeria',
      phone: '43342423',
      totalCost: 10,
      name: "john",
      surname: "Doe",
      deliveryDetails: 'please deliver after 5',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      address: 'Gondor',
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
      id: 'fd105551-0f0d-4a9f-bc41-c159c8a17260',
      orderId: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      quantity: 10,
      price: 14,
      comments: 'deliver fast'
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559a8a17261',
      orderId: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      quantity: 10,
      price: 12,
      comments: 'deliver low'
    },
  ];
}

async function seed() {
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.product.deleteMany();

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
