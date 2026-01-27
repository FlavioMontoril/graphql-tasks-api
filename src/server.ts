// src/server.ts
import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./infra/graphql/schema.js";
import { resolvers } from "./infra/graphql/resolvers.js";

import { mysqlClient } from "./infra/database/mysql.js";
import { initDatabase } from "./adapters/database/mysql/init-db.js";

async function startServer() {
  try {
    // 1️⃣ Inicializa o banco + tabela antes de iniciar o ApolloServer
    await initDatabase();

    // 2️⃣ Testa conexão
    await mysqlClient.getConnection();

    console.log("✅ MySQL conectado com sucesso");

    // 3️⃣ Cria o servidor Apollo
    const server = new ApolloServer({ typeDefs, resolvers });

    // 4️⃣ Inicializa GraphQL standalone
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(process.env.PORT) || 4002 },
    });

    console.log(`🚀 GraphQL Server running at ${url}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
}

startServer();
