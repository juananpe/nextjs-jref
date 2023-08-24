import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { LinksTable } from "./schema";
import { desc, eq } from "drizzle-orm";
import randomShortStrings from "./randomShortStrings";

const sql = neon(process.env.DATABASE_URL);
neonConfig.fetchConnectionCache = true;

const db = drizzle(sql);

export async function helloWorld() {
  const start = new Date();
  const [dbResponse] = await sql`SELECT NOW()`;
  const dbNow = dbResponse?.now;
  const end = new Date();
  return { dbNow, latency: end - start };
}

async function configureDatabase() {
  const response = await sql`
    CREATE TABLE IF NOT EXISTS links (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar(50),
        "created_at" timestamp DEFAULT now()
    );
  `;
  return response;
}

configureDatabase()
  .then(() => {
    console.log("Done configuring database");
  })
  .catch((err) => {
    console.log("Error configuring database", err);
  });

export async function addLink(url) {
  const short = randomShortStrings();
  const newLink = { url, short };
  return await db.insert(LinksTable).values(newLink).returning();
}

export async function getLinks(limit, offset) {
  const lookupLimit = limit || 10;
  const lookupOffset = offset || 0;

  return await db
    .select()
    .from(LinksTable)
    .limit(lookupLimit)
    .offset(lookupOffset);
}

export async function getShortLinkRecord(shortSlugValue) {
    // shortLink === LinksTable.short
    return await db
      .select()
      .from(LinksTable)
      .where( eq(LinksTable.short, shortSlugValue) );
  }
  

export async function getMinLinks(limit, offset) {
  const lookupLimit = limit || 10;
  const lookupOffset = offset || 0;

  return await db
    .select({
      id: LinksTable.id,
      url: LinksTable.url,
      timestamp: LinksTable.createdAt,
    })
    .from(LinksTable)
    .limit(lookupLimit)
    .offset(lookupOffset)
    .orderBy(desc(LinksTable.createdAt));
}
