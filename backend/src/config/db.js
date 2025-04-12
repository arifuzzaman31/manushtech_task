const { PrismaClient } = require('../../prisma/generated/prisma-client-js');
let prisma = null;
if(prisma === null) {
  prisma = new PrismaClient({
      errorFormat: 'minimal',
  });
}
module.exports = prisma;