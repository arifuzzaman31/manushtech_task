
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  uid: 'uid',
  email: 'email',
  phone: 'phone',
  name: 'name',
  password: 'password',
  status: 'status',
  userWeight: 'userWeight',
  isMfaEnabled: 'isMfaEnabled',
  loginAttempts: 'loginAttempts',
  isPasswordValid: 'isPasswordValid',
  isPasswordResetRequired: 'isPasswordResetRequired',
  lastPasswordResetDate: 'lastPasswordResetDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  roleId: 'roleId'
};

exports.Prisma.TokensScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  refreshToken: 'refreshToken',
  expiresAt: 'expiresAt',
  isRevoked: 'isRevoked',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolesScalarFieldEnum = {
  id: 'id',
  role: 'role',
  context: 'context'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  weight: 'weight',
  enabled: 'enabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PromotionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  startDate: 'startDate',
  endDate: 'endDate',
  enabled: 'enabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SlabScalarFieldEnum = {
  id: 'id',
  promotionId: 'promotionId',
  minWeight: 'minWeight',
  maxWeight: 'maxWeight',
  discount: 'discount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  total: 'total',
  discount: 'discount',
  grandTotal: 'grandTotal',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  discount: 'discount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PromotionType = exports.$Enums.PromotionType = {
  percentage: 'percentage',
  fixed: 'fixed',
  weighted: 'weighted'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED'
};

exports.Prisma.ModelName = {
  Users: 'Users',
  Tokens: 'Tokens',
  Roles: 'Roles',
  Product: 'Product',
  Promotion: 'Promotion',
  Slab: 'Slab',
  Order: 'Order',
  OrderItem: 'OrderItem'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "F:\\arif_vai_project\\manushtech-master\\manushtech-master\\backend\\prisma\\generated\\prisma-client-js",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "prismaSchemaFolder"
    ],
    "sourceFilePath": "F:\\arif_vai_project\\manushtech-master\\manushtech-master\\backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "6.5.0",
  "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\", \"prismaSchemaFolder\"]\n  output          = \"./generated/prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Users {\n  id                      Int        @id @default(autoincrement())\n  uid                     String     @unique @default(uuid())\n  email                   String     @unique\n  phone                   String     @unique\n  name                    String?\n  password                String\n  status                  UserStatus @default(PENDING)\n  userWeight              Int?       @default(2)\n  isMfaEnabled            Boolean?   @default(false)\n  loginAttempts           Int?       @default(0)\n  isPasswordValid         Boolean?   @default(false)\n  isPasswordResetRequired Boolean?   @default(true)\n  lastPasswordResetDate   DateTime?  @default(now())\n  createdAt               DateTime   @default(now())\n  updatedAt               DateTime   @updatedAt\n  roleId                  Int\n  roleInfo                Roles      @relation(fields: [roleId], references: [id])\n  orders                  Order[]\n  tokens                  Tokens? // Relation to Tokens model\n\n  @@map(\"users\")\n}\n\nmodel Tokens {\n  id           Int      @id @default(autoincrement())\n  userId       Int      @unique\n  user         Users    @relation(fields: [userId], references: [id])\n  refreshToken String   @unique\n  expiresAt    DateTime // Token expiration date\n  isRevoked    Boolean  @default(false)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  @@map(\"tokens\")\n}\n\nmodel Roles {\n  id      Int     @id @default(autoincrement())\n  role    String\n  context String\n  Users   Users[]\n\n  @@map(\"roles\")\n}\n\nmodel Product {\n  id          Int         @id @default(autoincrement())\n  name        String\n  description String\n  price       Float\n  weight      Float\n  enabled     Boolean     @default(true)\n  orders      OrderItem[]\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n}\n\nmodel Promotion {\n  id        Int           @id @default(autoincrement())\n  title     String\n  type      PromotionType @default(percentage)\n  startDate DateTime\n  endDate   DateTime\n  enabled   Boolean       @default(true)\n  slabs     Slab[]\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n}\n\nmodel Slab {\n  id          Int       @id @default(autoincrement())\n  promotionId Int\n  minWeight   Float\n  maxWeight   Float?\n  discount    Float // per 500gm for weighted type\n  promotion   Promotion @relation(fields: [promotionId], references: [id])\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n}\n\nmodel Order {\n  id         Int         @id @default(autoincrement())\n  customerId Int\n  total      Float\n  discount   Float       @default(0)\n  grandTotal Float\n  items      OrderItem[]\n  customers  Users       @relation(fields: [customerId], references: [id])\n  createdAt  DateTime    @default(now())\n  updatedAt  DateTime    @updatedAt\n}\n\nmodel OrderItem {\n  id        Int      @id @default(autoincrement())\n  orderId   Int\n  productId Int\n  quantity  Int\n  unitPrice Float\n  discount  Float\n  order     Order    @relation(fields: [orderId], references: [id])\n  product   Product  @relation(fields: [productId], references: [id])\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum PromotionType {\n  percentage\n  fixed\n  weighted\n}\n\nenum UserStatus {\n  PENDING\n  ACTIVE\n  INACTIVE\n  BLOCKED\n}\n",
  "inlineSchemaHash": "6e6371ac8bb213167b46d77640d07aec027a50bd27330c84aa9fea5a5ef36662",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Users\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"uid\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"UserStatus\"},{\"name\":\"userWeight\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isMfaEnabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"loginAttempts\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isPasswordValid\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isPasswordResetRequired\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lastPasswordResetDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"roleId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"roleInfo\",\"kind\":\"object\",\"type\":\"Roles\",\"relationName\":\"RolesToUsers\"},{\"name\":\"orders\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToUsers\"},{\"name\":\"tokens\",\"kind\":\"object\",\"type\":\"Tokens\",\"relationName\":\"TokensToUsers\"}],\"dbName\":\"users\"},\"Tokens\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"Users\",\"relationName\":\"TokensToUsers\"},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"isRevoked\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"tokens\"},\"Roles\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"context\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Users\",\"kind\":\"object\",\"type\":\"Users\",\"relationName\":\"RolesToUsers\"}],\"dbName\":\"roles\"},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"weight\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"enabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"orders\",\"kind\":\"object\",\"type\":\"OrderItem\",\"relationName\":\"OrderItemToProduct\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Promotion\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"PromotionType\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"enabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"slabs\",\"kind\":\"object\",\"type\":\"Slab\",\"relationName\":\"PromotionToSlab\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Slab\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"promotionId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"minWeight\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"maxWeight\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"discount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"promotion\",\"kind\":\"object\",\"type\":\"Promotion\",\"relationName\":\"PromotionToSlab\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Order\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"customerId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"total\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"discount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"grandTotal\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"items\",\"kind\":\"object\",\"type\":\"OrderItem\",\"relationName\":\"OrderToOrderItem\"},{\"name\":\"customers\",\"kind\":\"object\",\"type\":\"Users\",\"relationName\":\"OrderToUsers\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"OrderItem\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"orderId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"unitPrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"discount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToOrderItem\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"OrderItemToProduct\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

