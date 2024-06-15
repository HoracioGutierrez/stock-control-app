import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  numeric
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"
import { act } from "react"
import { sql } from "drizzle-orm"

const connectionString = process.env.DATABASE_URL || ""
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

const tablePrefix = process.env.TABLE_PREFIX || ""

export const users = pgTable(tablePrefix + "user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  username: text("username"),
  password: text("password"),
  isAdmin: boolean("isAdmin").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})



export const accounts = pgTable(
  tablePrefix + "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable(tablePrefix + "session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  tablePrefix + "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  tablePrefix + "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const customers: any = pgTable(
  tablePrefix + "customer",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    lastName: text("lastName").notNull(),
    phone: text("phone"),
    email: text("email"),
    address: text("address"),
    legalName: text("legalName"),
    cuitCuil: text("cuitCuil"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
    active: boolean("active").notNull(),
  }
)

export const products: any = pgTable(
  tablePrefix + "product",
  {
    id: text("id")
      .notNull()
      .unique()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description"),
    price: numeric("price").notNull(),
    quantity: numeric("quantity"),
    barcode: text("barcode").notNull(),
    stock: numeric("stock").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
    isVariant: boolean("isVariant").notNull(),
    productId: text("productId"),
    active: boolean("active").notNull(),
  },
  (product) => ({
    compositePK: primaryKey({
      columns: [product.userId, product.id],
    }),
  })
)

export const history: any = pgTable(
  tablePrefix + "history",
  {
    id: text("id")
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    actionType : text("actionType").notNull(),
    products : text("products").array().notNull().default(sql`'{}'::text[]`),
    orderId : text("orderId"),
    customerId : text("customerId"),
    ip : text("ip"),
    userAgent : text("userAgent"),
  }
)

export const cashRegister: any = pgTable(
  tablePrefix + "cashRegister",
  {
    id: text("id")
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    label: text("label").notNull(),
    currentAmount: numeric("currentAmount").notNull(),
    totalAmount: numeric("totalAmount").notNull(),
  }
)



export type ProductType = typeof products.$inferInsert

export type CustomerType = typeof customers.$inferInsert

export type CashRegisterType = typeof cashRegister.$inferInsert