const prisma = require('../config/db');

exports.getAllPromotions = async () => {
  return prisma.promotion.findMany({
    include: { slabs: true },
    orderBy: { startDate: 'desc' },
  });
};

exports.createPromotion = async ({ title, type, startDate, endDate, slabs }) => {
  return prisma.promotion.create({
    data: {
      title,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      slabs: {
        create: slabs.map(slab => ({
          minWeight: slab.minWeight,
          maxWeight: slab.maxWeight,
          discount: slab.discount,
        }))
      }
    },
    include: { slabs: true }
  });
};

exports.updatePromotion = async (id, { title, startDate, endDate }) => {
  return prisma.promotion.update({
    where: { id },
    data: {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
    include: { slabs: true }
  });
};

exports.togglePromotionStatus = async (id) => {
  const existing = await prisma.promotion.findUnique({ where: { id } });
  if (!existing) throw new Error('Promotion not found');

  return prisma.promotion.update({
    where: { id },
    data: { enabled: !existing.enabled },
    include: { slabs: true }
  });
};
