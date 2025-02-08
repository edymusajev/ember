import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const main = async () => {
  const prisma = new PrismaClient();
  const server = Fastify({ logger: true });

  // Register CORS with the desired configuration.
  // Here we allow only the frontend running at http://localhost:5173.
  server.register(fastifyCors, {
    origin: "http://localhost:5173",
  });

  server.get("/", async (_request) => {
    const addresses = await prisma.address.findMany();

    return { addresses };
  });

  try {
    await server.listen({
      port: 4001,
    });
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

main();
