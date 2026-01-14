import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean up existing data (optional, be careful in production)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.member.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Products
  console.log('Seeding Products...');
  const pizzaMargherita = await prisma.product.create({
    data: {
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
      price: 14.99,
      category: 'Pizza',
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
      tags: 'vegetarian,classic,best-seller', // SQLite string tag
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const pepperoniPizza = await prisma.product.create({
    data: {
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella and tomato sauce',
      price: 16.99,
      category: 'Pizza',
      stock: 45,
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
      tags: 'spicy,meat,popular',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  
  const coke = await prisma.product.create({
    data: {
      name: 'Coca Cola',
      description: 'Chilled can of Coke',
      price: 2.99,
      category: 'Beverage',
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97',
      tags: 'drink,cold',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // 2. Seed Users
  console.log('Seeding Users...');
  const users = [
    {
      email: 'rakesh@teleaon.ai',
      name: 'Rakesh',
      password: 'admin12345',
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'sandeep@teleaon.ai',
      name: 'Sandeep',
      password: 'admin12345',
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // 3. Seed Members
  console.log('Seeding Members...');
  const memberJohn = await prisma.member.create({
    data: {
      memberId: 'BB001',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+60123456789',
      joinDate: new Date('2024-01-15'),
      tier: 'gold',
      points: 1500,
      totalSpent: 3500.50,
      status: 'active',
      visits: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });

  // 4. Seed Staff
  console.log('Seeding Staff...');
  const staffSarah = await prisma.staff.create({
    data: {
      employeeId: 'EMP001',
      name: 'Sarah Connor',
      email: 'sarah@advakkad.com',
      phone: '+60198765432',
      position: 'Manager',
      department: 'Operations',
      hireDate: new Date('2023-05-01'),
      salary: 5000.00,
      status: 'active',
      leaveBalanceAnnual: 14,
      leaveBalanceSick: 10,
      leaveBalancePersonal: 5,
      performanceRating: 4.8,
      lastReview: new Date('2024-06-01'),
    }
  });

  const staffMike = await prisma.staff.create({
    data: {
      employeeId: 'EMP002',
      name: 'Mike Ross',
      email: 'mike@advakkad.com',
      phone: '+601122334455',
      position: 'Server',
      department: 'Service',
      hireDate: new Date('2024-02-15'),
      salary: 2500.00,
      status: 'active',
      leaveBalanceAnnual: 10,
      leaveBalanceSick: 12,
      leaveBalancePersonal: 3,
      performanceRating: 4.2,
    }
  });

  // 5. Seed Attendance
  console.log('Seeding Attendance...');
  await prisma.attendance.create({
    data: {
      staffId: staffSarah.id,
      date: new Date(), // Today
      punchIn: '09:00',
      punchOut: '17:00',
      totalHours: 8.0,
      status: 'present',
      location: 'Main Branch',
      notes: 'On time',
    }
  });
  
  await prisma.attendance.create({
    data: {
      staffId: staffMike.id,
      date: new Date(), // Today
      punchIn: '10:00',
      status: 'present', // Currently working
      location: 'Main Branch',
      totalHours: 0,
    }
  });

  // 6. Seed Orders
  console.log('Seeding Orders...');
  await prisma.order.create({
    data: {
      orderNumber: 'ORD-2024-001',
      customerName: 'Walk-in Customer',
      total: 34.97,
      subtotal: 31.97,
      discount: 0,
      serviceTax: 3.00,
      status: 'completed',
      paymentMethod: 'cash',
      date: new Date(),
      items: {
        create: [
          {
            productId: pizzaMargherita.id,
            name: pizzaMargherita.name,
            price: pizzaMargherita.price,
            quantity: 1,
          },
          {
            productId: pepperoniPizza.id,
            name: pepperoniPizza.name,
            price: pepperoniPizza.price,
            quantity: 1,
          }
        ]
      }
    }
  });

  await prisma.order.create({
    data: {
      orderNumber: 'ORD-2024-002',
      customerName: memberJohn.name,
      memberId: memberJohn.id,
      total: 17.98,
      subtotal: 17.98,
      discount: 0,
      serviceTax: 0,
      status: 'pending',
      paymentMethod: 'credit_card',
      date: new Date(),
      items: {
        create: [
          {
            productId: pizzaMargherita.id,
            name: pizzaMargherita.name,
            price: pizzaMargherita.price,
            quantity: 1,
          },
          {
            productId: coke.id,
            name: coke.name,
            price: coke.price,
            quantity: 1,
          }
        ]
      }
    }
  });

  // 7. Seed Invoices
  console.log('Seeding Invoices...');
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2025-001',
      customerName: 'Corporate Client A',
      grandTotal: 1500.00,
      status: 'paid',
      issueDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      paymentMethod: 'bank_transfer',
      items: {
        create: [
          {
            description: 'Catering Service - Annual Dinner',
            quantity: 1,
            unitPrice: 1500.00,
            total: 1500.00
          }
        ]
      }
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
