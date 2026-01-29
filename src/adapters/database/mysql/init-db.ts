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

  await mysqlClient.execute(`
      ALTER TABLE tasks
      MODIFY updated_at DATETIME,
      MODIFY code VARCHAR(10),
      MODIFY summary VARCHAR(30),
      MODIFY reporter VARCHAR(50),
      MODIFY assignee VARCHAR(50);
      `)

  console.log("✅ Database and table 'tasks' initialized");
}
