import dotenv from "dotenv";
import {schema} from "./infra/graphql/schema"
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { mysqlClient } from "./infra/database/mysql.js";
import { initDatabase } from "./adapters/database/mysql/init-db.js";

async function startServer() {
  try {

    await initDatabase();

    await mysqlClient.getConnection();

    console.log("✅ MySQL conectado com sucesso");

    const server = new ApolloServer({schema});

    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(process.env.PORT)  },
    });

    console.log(`🚀 GraphQL Server running at ${url}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
}

startServer();
