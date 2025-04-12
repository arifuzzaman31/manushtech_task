const prisma = require("../config/db");
const { getActivePromotion } = require("../utils/helper");
exports.getAllOrders = async (page = 1, limit = 10) => {
  const convertedLimit = parseInt(limit);
  const skip = (page - 1) * convertedLimit;
  const orders = await prisma.order.findMany({
    skip,
    take: convertedLimit,
    orderBy: { createdAt: "desc" },
    include: {
      items: {select: { productId: true, quantity: true, unitPrice: true, discount: true }},
      customers: {select: { name: true, email: true }}, // Include customer details
    },
  });
  const totalOrders = await prisma.order.count();
  const totalPages = Math.ceil(totalOrders / convertedLimit);
  return { orders, totalPages, currentPage: page };
};
// order payload body
// {
//   "customer": "John Doe",
//   "items": [
//     {
//       "productId": "prod-1234-uuid",
//       "quantity": 12
//     },
//     {
//       "productId": "prod-5678-uuid",
//       "quantity": 4
//     }
//   ]
// }
exports.createOrder = async ({ customerId: customerRawId, items }) => {
  let total = 0;
  let discount = 0;
  const orderItems = [];
  const customerId = parseInt(customerRawId);

  for (const item of items) {
    const { productId, quantity } = item;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.enabled) continue;

    const promotions = await prisma.promotion.findMany({
      where: {
        enabled: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
      include: { slabs: true },
    });

    const unitPrice = product.price;
    const weight = product.weight * quantity;
    const applicablePromo = getActivePromotion(promotions);

    let productDiscount = 0;
    if (applicablePromo) {
      switch (applicablePromo.type) {
        case "percentage":
          productDiscount =
            unitPrice * quantity * (applicablePromo.slabs[0].discount / 100);
          break;

        case "fixed":
          productDiscount = applicablePromo.slabs[0].discount * quantity;
          break;

        case "weighted":
          const slab = applicablePromo.slabs.find(
            (s) =>
              weight >= s.minWeight &&
              (s.maxWeight === null || weight <= s.maxWeight)
          );
          if (slab) {
            const unitIn500g = weight / 0.5;
            productDiscount = slab.discount * unitIn500g;
          }
          break;
      }
    }

    const itemTotal = unitPrice * quantity;
    total += itemTotal;
    discount += productDiscount;

    orderItems.push({
      productId,
      quantity,
      unitPrice,
      discount: productDiscount,
    });
  }

  const grandTotal = total - discount;

  return prisma.order.create({
    data: {
      customerId,
      total,
      discount,
      grandTotal,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
    },
  });
};
