import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Seed Users
  // Seed Users
  // Only create the specific admin user requested
  const users = [
    {
      email: 'abhilash@advakkad.com',
      password: 'admin123456',
      name: 'Abhilash', // Assuming name from email
      role: 'admin',
      locationId: 'loc1',
      status: 'active'
    }
  ];

  console.log('Seeding users...');
  
  // Cleanup: Remove any other users (e.g. from previous seeds if not running reset)
  await prisma.user.deleteMany({
    where: {
      email: {
        notIn: users.map(u => u.email)
      }
    }
  });

  for (const user of users) {
    const exists = await prisma.user.findUnique({
      where: { email: user.email }
    });

    if (!exists) {
      await prisma.user.create({
        data: user
      });
    } else {
      // Update existing user to ensure password match
      await prisma.user.update({
        where: { email: user.email },
        data: user
      });
    }
  }

  // Cleanup existing data (optional, but good for idempotent testing if we want clear state, 
  // but user might have real data. Let's be additive or safe.
  // Given the request "add sample data", I will just upsert or create if not exists.)
  // Actually, for clear demo, I'll delete these specific sample IDs if they exist and recreate them.
  
  const staffMembers = [
    {
      id: 'staff-sample-1',
      employeeId: 'EMP001',
      name: 'Alice Johnson',
      email: 'alice@adavakkad.com',
      phone: '555-0101',
      position: 'Manager',
      department: 'Management',
      hireDate: new Date('2023-01-15'),
      salary: 5000,
      status: 'active',
      leaveBalance: { annual: 20, sick: 10, personal: 5 },
      performance: { rating: 4.8, lastReview: '2023-12-01' }
    },
    {
      id: 'staff-sample-2',
      employeeId: 'EMP002',
      name: 'Bob Smith',
      email: 'bob@adavakkad.com',
      phone: '555-0102',
      position: 'Cashier',
      department: 'Sales',
      hireDate: new Date('2023-03-20'),
      salary: 3000,
      status: 'active',
      leaveBalance: { annual: 15, sick: 10, personal: 5 },
      performance: { rating: 4.2, lastReview: '2023-11-15' }
    },
    {
      id: 'staff-sample-3',
      employeeId: 'EMP003',
      name: 'Charlie Brown',
      email: 'charlie@adavakkad.com',
      phone: '555-0103',
      position: 'Chef',
      department: 'Kitchen',
      hireDate: new Date('2023-06-10'),
      salary: 4000,
      status: 'active', // One inactive/on-leave? Let's keep active for clock-in demo
      leaveBalance: { annual: 18, sick: 12, personal: 5 },
      performance: { rating: 4.5, lastReview: '2023-10-30' }
    }
  ];

  const createdStaff: { id: string; employeeId: string }[] = [];

  for (const staff of staffMembers) {
    const { leaveBalance, performance, ...data } = staff;
    
    // Check if exists first to get ID if we can't force ID on update
    // But upsert returns the record!
    
    const updateData = { // Define update logic to ensure sample data overwrites old data
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        department: data.department,
        hireDate: data.hireDate,
        salary: data.salary,
        status: data.status as string,
        leaveBalanceAnnual: leaveBalance.annual,
        leaveBalanceSick: leaveBalance.sick,
        leaveBalancePersonal: leaveBalance.personal,
        performanceRating: performance.rating,
        lastReview: performance.lastReview ? new Date(performance.lastReview) : undefined
    };

    const record = await prisma.staff.upsert({
      where: { employeeId: staff.employeeId },
      update: updateData, // Actually update!
      create: {
        ...data,
        ...updateData
      },
    });
    createdStaff.push(record);
  }
  
  // Helper to find ID by Employee ID
  const getStaffId = (empId: string) => createdStaff.find(s => s.employeeId === empId)?.id;

  // Attendance Records
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const attendanceData = [
    // Today
    {
      employeeId: 'EMP001', // Use employeeId to lookup
      date: today,
      punchIn: '09:00',
      punchOut: '17:00',
      totalHours: 8,
      status: 'present'
    },
    {
        employeeId: 'EMP002',
        date: today,
        punchIn: '10:00',
        punchOut: null,
        totalHours: 0,
        status: 'present'
    },
    // Yesterday
    {
        employeeId: 'EMP001',
        date: yesterday,
        punchIn: '09:00',
        punchOut: '17:30',
        totalHours: 8.5,
        status: 'present'
    },
    {
        employeeId: 'EMP002',
        date: yesterday,
        punchIn: '10:00',
        punchOut: '18:00',
        totalHours: 8,
        status: 'present'
    },
    {
        employeeId: 'EMP003',
        date: yesterday,
        punchIn: '08:00',
        punchOut: '16:00',
        totalHours: 8,
        status: 'present'
    }
  ];

  console.log('Seeding attendance...');
  for (const att of attendanceData) {
      const realStaffId = getStaffId(att.employeeId);
      if (!realStaffId) continue;

      const exists = await prisma.attendance.findFirst({
          where: {
              staffId: realStaffId,
              date: {
                  gte: new Date(att.date.setHours(0,0,0,0)),
                  lt: new Date(att.date.setHours(23,59,59,999))
              }
          }
      });
      
      if (!exists) {
          await prisma.attendance.create({
              data: {
                  staffId: realStaffId,
                  date: att.date,
                  punchIn: att.punchIn,
                  punchOut: att.punchOut,
                  totalHours: att.totalHours,
                  status: att.status
              }
          });
      }
  }

  // Indian Menu Items
  // Expanded Menu Items by Cuisine
  const southIndian = [
    {
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato masala',
      price: 120.00,
      category: 'South Indian',
      stock: 100,
      imageUrl: '/products/Masala%20Dosa.png',
      tags: 'vegetarian,breakfast,popular',
      isFeatured: true
    },
    {
      name: 'Idli Vada Set',
      description: 'Steamed rice cakes and savory lentil donuts served with chutney and sambar',
      price: 80.00,
      category: 'South Indian',
      stock: 150,
      imageUrl: '/products/Idli%20Vada%20Set.png',
      tags: 'vegetarian,breakfast',
      isFeatured: false
    },
    {
      name: 'Uttapam',
      description: 'Thick savory pancake topped with onions and tomatoes',
      price: 100.00,
      category: 'South Indian',
      stock: 80,
      imageUrl: '/products/Uttapam.png',
      tags: 'vegetarian,breakfast',
      isFeatured: false
    }
  ];

  const northIndian = [
    {
      name: 'Butter Chicken',
      description: 'Tender chicken cooked in a rich tomato and butter gravy',
      price: 320.00,
      category: 'North Indian',
      stock: 50,
      imageUrl: '/products/Butter%20Chicken.png',
      tags: 'curry,chicken,popular',
      isFeatured: true
    },
    {
      name: 'Dal Makhani',
      description: 'Black lentils cooked with butter and cream',
      price: 240.00,
      category: 'North Indian',
      stock: 60,
      imageUrl: '/products/Dal%20Makhani.png',
      tags: 'vegetarian,curry,popular',
      isFeatured: true
    },
    {
      name: 'Garlic Naan',
      description: 'Oven-baked flatbread topped with garlic and butter',
      price: 45.00,
      category: 'North Indian',
      stock: 200,
      imageUrl: '/products/Garlic%20Naan.png',
      tags: 'bread,side',
      isFeatured: false
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese cubes in a creamy tomato gravy',
      price: 280.00,
      category: 'North Indian',
      stock: 45,
      imageUrl: '/products/Paneer%20Butter%20Masala.png',
      tags: 'vegetarian,paneer,curry',
      isFeatured: false
    }
  ];

  const chinese = [
    {
      name: 'Chicken Fried Rice',
      description: 'Stir-fried rice with chicken, eggs, and vegetables',
      price: 220.00,
      category: 'Chinese',
      stock: 75,
      imageUrl: '/products/Chicken%20Fried%20Rice.png',
      tags: 'rice,chicken',
      isFeatured: false
    },
    {
      name: 'Gobi Manchurian',
      description: 'Crispy cauliflower florets tossed in spicy manchurian sauce',
      price: 180.00,
      category: 'Chinese',
      stock: 60,
      imageUrl: '/products/gobi-manchurian.png',
      tags: 'vegetarian,starter,spicy',
      isFeatured: true
    },
    {
      name: 'Hakka Noodles',
      description: 'Stir-fried noodles with crunchy vegetables',
      price: 200.00,
      category: 'Chinese',
      stock: 80,
      imageUrl: '/products/Hakka%20Noodles.png',
      tags: 'vegetarian,noodles',
      isFeatured: false
    }
  ];

  const kerala = [
    {
      name: 'Kerala Fish Curry',
      description: 'Spicy fish curry cooked with cocum and coconut milk',
      price: 350.00,
      category: 'Kerala Special',
      stock: 40,
      imageUrl: '/products/Kerala%20Fish%20Curry.png',
      tags: 'seafood,spicy,curry',
      isFeatured: true
    },
    {
      name: 'Appam with Stew',
      description: 'Soft rice pancakes served with vegetable stew',
      price: 150.00,
      category: 'Kerala Special',
      stock: 55,
      imageUrl: '/products/Appam%20with%20Stew.png',
      tags: 'vegetarian,breakfast',
      isFeatured: true
    },
    {
      name: 'Beef Fry',
      description: 'Spicy stir-fried beef with coconut slices and curry leaves',
      price: 280.00,
      category: 'Kerala Special',
      stock: 45,
      imageUrl: '/products/Beef%20Fry.png',
      tags: 'meat,spicy,popular',
      isFeatured: false
    },
    {
      name: 'Malabar Parotta',
      description: 'Layered flaky flatbread',
      price: 25.00,
      category: 'Kerala Special',
      stock: 300,
      imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=1000', // Placeholder
      tags: 'bread,side',
      isFeatured: false
    }
  ];

  const tamilNadu = [
    {
      name: 'Chicken Chettinad',
      description: 'Spicy chicken curry from the Chettinad region',
      price: 300.00,
      category: 'Tamil Nadu Special',
      stock: 50,
      imageUrl: '/products/chicken-chettinad.png',
      tags: 'chicken,spicy,curry',
      isFeatured: true
    },
    {
      name: 'Kothu Parotta',
      description: 'Minced parotta stir-fried with eggs, meat, and spicy sauce',
      price: 180.00,
      category: 'Tamil Nadu Special',
      stock: 60,
      imageUrl: '/products/Kothu%20Parotta.png',
      tags: 'spicy,street-food',
      isFeatured: false
    },
    {
      name: 'Pongal',
      description: 'Savory rice and lentil porridge seasoned with black pepper',
      price: 90.00,
      category: 'Tamil Nadu Special',
      stock: 80,
      imageUrl: '/products/Pongal.png',
      tags: 'vegetarian,breakfast',
      isFeatured: false
    }
  ];

  // Combine all menus
  const allProducts = [
    ...southIndian,
    ...northIndian,
    ...chinese,
    ...kerala,
    ...tamilNadu
  ];

  console.log('Seeding menu...');
  for (const item of allProducts) {
      // Upsert products to avoid duplicates
      // We don't have a unique field for products other than ID, but for seeding we can check by name
      const exists = await prisma.product.findFirst({ where: { name: item.name } });
      if (!exists) {
          await prisma.product.create({
              data: {
                  ...item
              }
          });
      }
  }

  // Members
  const members = [
    {
      memberId: 'MEM001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0201',
      tier: 'gold',
      points: 1250,
      totalSpent: 1250.50,
      status: 'active',
      visits: 15,
      joinDate: new Date('2023-01-01')
    },
    {
      memberId: 'MEM002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-0202',
      tier: 'silver',
      points: 450,
      totalSpent: 450.00,
      status: 'active',
      visits: 5,
      joinDate: new Date('2023-06-15')
    },
    {
      memberId: 'MEM003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '555-0203',
      tier: 'bronze',
      points: 150,
      totalSpent: 150.00,
      status: 'inactive',
      visits: 2,
      joinDate: new Date('2023-11-20')
    }
  ];

  console.log('Seeding members...');
  for (const member of members) {
    const exists = await prisma.member.findUnique({
      where: { memberId: member.memberId }
    });

    if (!exists) {
      await prisma.member.create({ data: member });
    }
  }

  // Get referenced products for orders
  const products = await prisma.product.findMany();
  if (products.length === 0) {
    console.warn('No products found to seed orders!');
  } else {
    // Orders
    console.log('Seeding orders...');
    
    // Helper to get random product
    const getRandomProduct = () => products[Math.floor(Math.random() * products.length)];
    
    // Create some past orders
    const ordersToCreate = [
      {
        orderNumber: 'ORD-2024-001',
        customerName: 'Rahul Menon',
        memberId: null,
        status: 'completed',
        total: 540.00,
        subtotal: 500.00,
        discount: 0,
        serviceTax: 40.00,
        paymentMethod: 'UPI',
        date: new Date(new Date().setDate(today.getDate() - 2)),
        items: [
          { quantity: 2, product: getRandomProduct() },
          { quantity: 1, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-002',
        customerName: 'Guest (Table 4)',
        memberId: null,
        status: 'completed',
        total: 320.00,
        subtotal: 300.00,
        discount: 0,
        serviceTax: 20.00,
        paymentMethod: 'Cash',
        date: new Date(new Date().setDate(today.getDate() - 2)),
        items: [
          { quantity: 1, product: getRandomProduct() },
          { quantity: 2, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-003',
        customerName: 'Deepa Nair',
        memberId: null,
        status: 'completed',
        total: 850.00,
        subtotal: 800.00,
        discount: 20.00,
        serviceTax: 70.00,
        paymentMethod: 'Card',
        date: new Date(new Date().setDate(today.getDate() - 1)),
        items: [
          { quantity: 3, product: getRandomProduct() },
          { quantity: 1, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-004',
        customerName: 'Guest (Table 7)',
        memberId: null,
        status: 'serving',
        total: 1200.00,
        subtotal: 1150.00,
        discount: 0,
        serviceTax: 50.00,
        paymentMethod: 'Cash',
        date: new Date(),
        items: [
          { quantity: 4, product: getRandomProduct() },
          { quantity: 2, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-005',
        customerName: 'Arjun Pillai',
        memberId: null,
        status: 'pending',
        total: 250.00,
        subtotal: 240.00,
        discount: 0,
        serviceTax: 10.00,
        paymentMethod: 'UPI',
        date: new Date(),
        items: [
          { quantity: 1, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-006',
        customerName: 'Guest (Table 12)',
        memberId: null,
        status: 'completed',
        total: 1560.00,
        subtotal: 1500.00,
        discount: 50.00,
        serviceTax: 110.00,
        paymentMethod: 'Card',
        date: new Date(new Date().setDate(today.getDate() - 1)),
        items: [
          { quantity: 2, product: getRandomProduct() },
          { quantity: 2, product: getRandomProduct() },
          { quantity: 1, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-007',
        customerName: 'Lakshmi Krishnan',
        memberId: null,
        status: 'completed',
        total: 440.00,
        subtotal: 420.00,
        discount: 0,
        serviceTax: 20.00,
        paymentMethod: 'UPI',
        date: new Date(),
        items: [
          { quantity: 2, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-008',
        customerName: 'Guest (Table 2)',
        memberId: null,
        status: 'kitchen',
        total: 980.00,
        subtotal: 900.00,
        discount: 0,
        serviceTax: 80.00,
        paymentMethod: 'Cash',
        date: new Date(),
        items: [
          { quantity: 3, product: getRandomProduct() },
          { quantity: 1, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-009',
        customerName: 'Vinu Thomas',
        memberId: null,
        status: 'completed',
        total: 670.00,
        subtotal: 650.00,
        discount: 10.00,
        serviceTax: 30.00,
        paymentMethod: 'Card',
        date: new Date(new Date().setDate(today.getDate() - 3)),
        items: [
          { quantity: 1, product: getRandomProduct() },
          { quantity: 2, product: getRandomProduct() }
        ]
      },
      {
        orderNumber: 'ORD-2024-010',
        customerName: 'Anjali Devi',
        memberId: null,
        status: 'pending',
        total: 310.00,
        subtotal: 300.00,
        discount: 0,
        serviceTax: 10.00,
        paymentMethod: 'UPI',
        date: new Date(),
        items: [
          { quantity: 1, product: getRandomProduct() },
          { quantity: 1, product: getRandomProduct() }
        ]
      }
    ];

    for (const orderData of ordersToCreate) {
      const exists = await prisma.order.findUnique({
        where: { orderNumber: orderData.orderNumber }
      });

      if (!exists) {
        // Resolve member ID if present
        let memberDbId = null;
        if (orderData.memberId) {
          const m = await prisma.member.findUnique({ where: { memberId: orderData.memberId }});
          if (m) memberDbId = m.id;
        }

        await prisma.order.create({
          data: {
            orderNumber: orderData.orderNumber,
            customerName: orderData.customerName,
            memberId: memberDbId,
            total: orderData.total,
            subtotal: orderData.subtotal,
            discount: orderData.discount,
            serviceTax: orderData.serviceTax,
            status: orderData.status,
            paymentMethod: orderData.paymentMethod,
            date: orderData.date,
            items: {
              create: orderData.items.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
              }))
            }
          }
        });
      }
    }
  }

  // Invoices
  console.log('Seeding invoices...');
  const invoices = [
    {
      invoiceNumber: 'INV-2024-001',
      customerName: 'Walk-in Customer (Table 5)',
      grandTotal: 1250.00,
      status: 'paid',
      issueDate: new Date('2024-01-15'),
      dueDate: new Date('2024-01-15'),
      items: [
        { description: 'Butter Chicken', quantity: 1, unitPrice: 320.00, total: 320.00 },
        { description: 'Garlic Naan', quantity: 4, unitPrice: 45.00, total: 180.00 },
        { description: 'Chicken Fried Rice', quantity: 2, unitPrice: 220.00, total: 440.00 },
        { description: 'Lime Juice', quantity: 3, unitPrice: 40.00, total: 120.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-002',
      customerName: 'Zomato Order #8821',
      grandTotal: 850.50,
      status: 'paid',
      issueDate: new Date('2024-01-16'),
      dueDate: new Date('2024-01-16'),
      items: [
        { description: 'Chicken Chettinad', quantity: 1, unitPrice: 300.00, total: 300.00 },
        { description: 'Malabar Parotta', quantity: 5, unitPrice: 25.00, total: 125.00 },
        { description: 'Gobi Manchurian', quantity: 1, unitPrice: 180.00, total: 180.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-003',
      customerName: 'John Doe (Takeaway)',
      grandTotal: 450.00,
      status: 'paid',
      issueDate: new Date('2024-01-16'),
      dueDate: new Date('2024-01-16'),
      items: [
        { description: 'Kerala Fish Curry', quantity: 1, unitPrice: 350.00, total: 350.00 },
        { description: 'Appam', quantity: 4, unitPrice: 25.00, total: 100.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-004',
      customerName: 'Corporate Lunch (TechSoft)',
      grandTotal: 5400.00,
      status: 'pending',
      issueDate: new Date('2024-01-17'),
      dueDate: new Date('2024-01-24'),
      items: [
        { description: 'Executive Thali', quantity: 20, unitPrice: 250.00, total: 5000.00 },
        { description: 'Mineral Water', quantity: 20, unitPrice: 20.00, total: 400.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-005',
      customerName: 'Swiggy Order #9923',
      grandTotal: 320.00,
      status: 'paid',
      issueDate: new Date('2024-01-17'),
      dueDate: new Date('2024-01-17'),
      items: [
        { description: 'Masala Dosa', quantity: 2, unitPrice: 120.00, total: 240.00 },
        { description: 'Vada', quantity: 2, unitPrice: 40.00, total: 80.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-006',
      customerName: 'Evening Snacks (Table 2)',
      grandTotal: 280.00,
      status: 'paid',
      issueDate: new Date('2024-01-18'),
      dueDate: new Date('2024-01-18'),
      items: [
        { description: 'Tea', quantity: 4, unitPrice: 20.00, total: 80.00 },
        { description: 'Parippu Vada', quantity: 4, unitPrice: 25.00, total: 100.00 },
        { description: 'Banana Fry', quantity: 4, unitPrice: 25.00, total: 100.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-007',
      customerName: 'Birthday Party Advance',
      grandTotal: 5000.00,
      status: 'paid',
      issueDate: new Date('2024-01-18'),
      dueDate: new Date('2024-01-18'),
      items: [
        { description: 'Hall Booking Advance', quantity: 1, unitPrice: 5000.00, total: 5000.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-008',
      customerName: 'Regular Customer (Sarah)',
      grandTotal: 650.00,
      status: 'overdue',
      issueDate: new Date('2023-12-28'),
      dueDate: new Date('2024-01-05'),
      items: [
        { description: 'Beef Fry', quantity: 1, unitPrice: 280.00, total: 280.00 },
        { description: 'Porotta', quantity: 6, unitPrice: 20.00, total: 120.00 },
        { description: 'Chicken 65', quantity: 1, unitPrice: 250.00, total: 250.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-009',
      customerName: 'Breakfast Takeout',
      grandTotal: 180.00,
      status: 'paid',
      issueDate: new Date('2024-01-18'),
      dueDate: new Date('2024-01-18'),
      items: [
        { description: 'Idli Set', quantity: 2, unitPrice: 60.00, total: 120.00 },
        { description: 'Coffee', quantity: 2, unitPrice: 30.00, total: 60.00 }
      ]
    },
    {
      invoiceNumber: 'INV-2024-010',
      customerName: 'Family Dinner (Table 8)',
      grandTotal: 2100.00,
      status: 'pending',
      issueDate: new Date('2024-01-18'),
      dueDate: new Date('2024-01-18'),
      items: [
        { description: 'Mixed Fried Rice', quantity: 2, unitPrice: 280.00, total: 560.00 },
        { description: 'Dragon Chicken', quantity: 1, unitPrice: 320.00, total: 320.00 },
        { description: 'Chilli Beef', quantity: 1, unitPrice: 300.00, total: 300.00 },
        { description: 'Fresh Lime Soda', quantity: 4, unitPrice: 60.00, total: 240.00 },
        { description: 'Ice Cream', quantity: 4, unitPrice: 80.00, total: 320.00 }
      ]
    }
  ];

  for (const inv of invoices) {
    const exists = await prisma.invoice.findUnique({
      where: { invoiceNumber: inv.invoiceNumber }
    });

    if (!exists) {
      await prisma.invoice.create({
        data: {
          invoiceNumber: inv.invoiceNumber,
          customerName: inv.customerName,
          grandTotal: inv.grandTotal,
          status: inv.status,
          issueDate: inv.issueDate,
          dueDate: inv.dueDate,
          items: {
            create: inv.items
          }
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
