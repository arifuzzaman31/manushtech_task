const prisma = require('../config/db');

exports.getAllProducts = async (req) => {
    const { pageNo, enabled, perPage } = req.query;
    const perPg = perPage ? Number(perPage) : 10;
    const from = Number(pageNo * perPg) - Number(perPg);
    let where = {};
    if (enabled !== undefined) {
        where.enabled = enabled === 'true';
    }
    const [count, products] = await prisma.$transaction([
        prisma.product.count({ where }),
        prisma.product.findMany({
            skip: pageNo ? from : 0,
            take: perPg,
            where,
            orderBy: {
                createdAt: 'desc',
            },
        }),
    ]);

    return {
        pagination: {
            totalPage: Math.ceil(count / perPg),
        },
        data: products,
    };
}
exports.createProduct = async ({ name, description, price, weight, enabled }) => {
    return prisma.product.create({
        data: {
            name,
            description,
            price,
            weight,
            enabled: enabled !== undefined ? enabled : true,
        },
    });
};
exports.toggleProductStatus = async (id) => {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error('Product not found');

    return prisma.product.update({
        where: { id },
        data: { enabled: !existing.enabled },
    });
}
exports.updateProduct = async (id, { name, description, price, weight, enabled }) => {
    return prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            weight,
            enabled: enabled !== undefined ? enabled : undefined,
        },
    });
};
exports.getProductById = async (id) => {
    return prisma.product.findUnique({
        where: { id },
    });
}
exports.deleteProduct = async (id) => {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error('Product not found');

    return prisma.product.delete({
        where: { id },
    });
}