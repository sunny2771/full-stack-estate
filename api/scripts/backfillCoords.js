import { PrismaClient } from "@prisma/client";
import { coordsForCity, parseCoord } from "../lib/geo.js";

const prisma = new PrismaClient();

const posts = await prisma.post.findMany();
let updated = 0;
for (const [index, post] of posts.entries()) {
  if (parseCoord(post.latitude) !== null && parseCoord(post.longitude) !== null) {
    continue;
  }
  const [lat, lng] = coordsForCity(post.city);
  await prisma.post.update({
    where: { id: post.id },
    data: {
      latitude: String(lat),
      longitude: String(lng + index * 0.012),
    },
  });
  updated += 1;
}

console.log(`updated=${updated}`);
await prisma.$disconnect();
