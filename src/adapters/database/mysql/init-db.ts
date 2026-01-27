import { mysqlClient } from "../../../infra/database/mysql";

export async function initDatabase() {

  await mysqlClient.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(36) NOT NULL PRIMARY KEY,
      code VARCHAR(255) NOT NULL UNIQUE,
      summary VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      reporter VARCHAR(255) NOT NULL,
      assignee VARCHAR(255),
      status ENUM('OPEN','IN_PROGRESS','DONE','ARCHIVED') DEFAULT 'OPEN',
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      archived BOOLEAN DEFAULT FALSE
    );
  `);

  console.log("✅ Database and table 'tasks' initialized");
}
