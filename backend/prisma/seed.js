// seed.js
const prisma =  require('../src/config/db.js');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    // Create Roles
    const superAdminRole = await prisma.roles.createMany({
        data: [
          {
            id: 1,
            role: 'SUPER_ADMIN',
            context: 'MT',
          },
          {
            id: 2,
            role: 'ADMIN',
            context: 'MT',
          },
          {
            id: 3,
            role: 'MANAGER',
            context: 'MT',
          },
          {
            id: 4,
            role: 'DEVELOPER',
            context: 'MT',
          },
          {
            id: 5,
            role: 'ADMIN',
            context: 'CLIENT',
          },
          {
            id: 6,
            role: 'USER',
            context: 'CLIENT',
          },
        ],
      });

    // Create Admin User
    const hashedPassword = await bcrypt.hash('adminpassword', 12); // Hash the password

    const abir = await prisma.users.upsert({
        where: { email: 'abir@manush.tech' },
        update: {},
        create: {
          uid: 'MANUSH-123987',
          email: 'abir@manush.tech',
          phone: '01711355057',
          name: 'Abir Rahman',
          password: hashedPassword,
          userWeight: 10,
          roleId: 1,
          isMfaEnabled: false,
          isPasswordValid: true,
          isPasswordResetRequired: false,
          lastPasswordResetDate: new Date(),
        },
      });
      console.log({ abir, superAdminRole });
    // Create Products
    const products = await prisma.product.createMany({
        data: [
          {
            name: 'Laptop',
            description: 'High-performance laptop',
            price: 1200.0,
            weight: 2.5,
          },
          {
            name: 'Smartphone',
            description: 'Latest smartphone model',
            price: 800.0,
            weight: 0.2,
          },
        ],
      });

    //Create Promotion
    const promotion = await prisma.promotion.create({
        data: {
          title: "Summer Sale",
          type: "percentage",
          startDate: new Date(),
          endDate: new Date(2025, 4, 26),
        }
      });

    //create Slabs
    const slabs = await prisma.slab.createMany({
        data: [
          {
            promotionId: promotion.id,
            minWeight: 0,
            maxWeight: 1,
            discount: 10,
          },
          {
            promotionId: promotion.id,
            minWeight: 1.1,
            maxWeight: 2,
            discount: 20,
          },
        ],
      });

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();