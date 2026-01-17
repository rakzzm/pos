import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Seed Users
  const users = [
    {
      email: 'rakesh@adavakkad.com',
      password: 'admin12345',
      name: 'Rakesh',
      role: 'admin',
      locationId: 'loc1',
      status: 'active'
    },
    {
      email: 'sandeep@adavakkad.com',
      password: 'admin12345',
      name: 'Sandeep',
      role: 'admin',
      locationId: 'loc1',
      status: 'active'
    },
    {
      email: 'manager@adavakkad.com',
      password: 'manager123',
      name: 'Manager User',
      role: 'manager',
      locationId: 'loc1',
      status: 'active'
    },
    {
      email: 'user@adavakkad.com',
      password: 'user123',
      name: 'Regular User',
      role: 'user',
      locationId: 'loc1',
      status: 'active'
    }
  ];

  console.log('Seeding users...');
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
  const indianMenu = [
    {
      name: 'Butter Chicken',
      description: 'Tender chicken cooked in a rich tomato and butter gravy',
      price: 18.90,
      category: 'Indian Special',
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1000',
      tags: 'curry,chicken,popular',
      isFeatured: true
    },
    {
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with spiced chicken and herbs',
      price: 16.50,
      category: 'Indian Special',
      stock: 40,
      imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000',
      tags: 'rice,spicy,popular',
      isFeatured: true
    },
    {
      name: 'Paneer Tikka Masala',
      description: 'Grilled cottage cheese cubes in a spicy curry sauce',
      price: 15.90,
      category: 'Indian Special',
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000',
      tags: 'vegetarian,curry,spicy',
      isFeatured: false
    },
    {
      name: 'Garlic Naan',
      description: 'Oven-baked flatbread topped with garlic and butter',
      price: 4.50,
      category: 'Indian Special',
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=1000',
      tags: 'bread,side',
      isFeatured: false
    },
    {
      name: 'South Indian Fish Curry',
      description: 'Spicy and tangy fish curry with coconut milk',
      price: 19.90,
      category: 'Indian Special',
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1626509653294-46d9263a2333?auto=format&fit=crop&q=80&w=1000',
      tags: 'seafood,spicy,curry',
      isFeatured: true
    },
    {
        name: 'Samosa Platter',
        description: 'Crispy pastry filled with spiced potatoes and peas (3 pcs)',
        price: 8.90,
        category: 'Starters',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000',
        tags: 'vegetarian,snack',
        isFeatured: false
    }
  ];

  console.log('Seeding menu...');
  for (const item of indianMenu) {
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
