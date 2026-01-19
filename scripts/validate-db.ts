import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Database Validation Report ---');
  
  const staffCount = await prisma.staff.count();
  console.log(`Staff Records: ${staffCount}`);
  
  const attendanceCount = await prisma.attendance.count();
  console.log(`Attendance Records: ${attendanceCount}`);
  
  const leaveCount = await prisma.leaveRequest.count();
  console.log(`Leave Requests: ${leaveCount}`);

  const usersCount = await prisma.user.count();
  console.log(`User Accounts: ${usersCount}`);

  if (staffCount < 10) {
    console.error('❌ ERROR: Missing Staff Data');
  } else {
    console.log('✅ Staff Data Checks Out');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
