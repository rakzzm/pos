
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const staffCount = await prisma.staff.count();
  const attendanceCount = await prisma.attendance.count();
  console.log(`Staff Count: ${staffCount}`);
  console.log(`Attendance Count: ${attendanceCount}`);
  
  if (staffCount > 0) {
      const staff = await prisma.staff.findFirst();
      console.log('Sample Staff:', staff);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
