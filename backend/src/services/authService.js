const prisma = require('../config/db');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison

const authService = {
  validateUser: async (email, password) => {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
        include: { roleInfo: true },
      });
      if (!user) {
        return null;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null;
      }
      return user;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  },
  getUserByEmail: async (email) => {
    return prisma.users.findUnique({
      where: { email },
    });
  },
  createUser:async (name, email, password, phone, role) => {
    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        roleId: role ?? 6, // Assuming role is passed as an ID
      },
    });
    return newUser;
  },
  getAllUsers: async (page, limit) => {
    const skip = (page - 1) * limit;
    const users = await prisma.users.findMany({
      skip: skip,
      take: limit,
      include: {
        roleInfo: true,
      },
    });
    const totalUsers = await prisma.users.count();
    return {
      users,
      totalUsers,
    };
  },
  getDashboardStats: async () => {
    try {
      const totalProducts = await prisma.product.count();
      const totalPromotions = await prisma.promotion.count({ where: { enabled: true } });
      const totalOrders = await prisma.order.count();
      const revenue = await prisma.order.aggregate({
        _sum: {
          grandTotal: true,
        },
      });
      const totalRevenue = revenue._sum.grandTotal || 0;
      return {
        totalOrders,
        totalProducts,
        totalPromotions,
        totalRevenue
      };
    }
    catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard stats');
    }
  }
};

module.exports = authService;
